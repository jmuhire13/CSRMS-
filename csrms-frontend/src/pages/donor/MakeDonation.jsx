import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FaDollarSign,
  FaHeart,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaPaypal,
  FaCheck
} from 'react-icons/fa';
import api from '../../services/api';

const MakeDonation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    type: 'one-time',
    category: 'general',
    paymentMethod: 'mobile-money',
    dedicatedTo: [],
    message: '',
    isAnonymous: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preSelectedChild, setPreSelectedChild] = useState(null);

  useEffect(() => {
    // Listen for donate to specific child event
    const handleDonateToChild = (e) => {
      setPreSelectedChild(e.detail);
      setFormData(prev => ({
        ...prev,
        dedicatedTo: [e.detail.childId],
        category: 'general'
      }));
    };

    window.addEventListener('donateToChild', handleDonateToChild);
    return () => window.removeEventListener('donateToChild', handleDonateToChild);
  }, []);

  const predefinedAmounts = [5000, 10000, 25000, 50000, 100000, 250000];

  const categories = [
    { value: 'general', label: 'General Support', icon: '🤝', description: 'Support overall operations' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥', description: 'Medical care and supplies' },
    { value: 'education', label: 'Education', icon: '📚', description: 'School fees and supplies' },
    { value: 'nutrition', label: 'Nutrition', icon: '🍎', description: 'Food and nutrition programs' },
    { value: 'housing', label: 'Housing', icon: '🏠', description: 'Shelter and accommodation' },
    { value: 'emergency', label: 'Emergency', icon: '🚨', description: 'Urgent and critical needs' }
  ];

  const paymentMethods = [
    { value: 'mobile-money', label: 'Mobile Money', icon: FaMobileAlt, popular: true },
    { value: 'credit-card', label: 'Credit Card', icon: FaCreditCard, popular: true },
    { value: 'bank-transfer', label: 'Bank Transfer', icon: FaUniversity, popular: false },
    { value: 'paypal', label: 'PayPal', icon: FaPaypal, popular: false }
  ];

  const handleAmountSelect = (amount) => {
    setFormData({ ...formData, amount, customAmount: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const finalAmount = formData.amount || parseFloat(formData.customAmount);
    
    if (!finalAmount || finalAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    try {
      setSubmitting(true);
      
      const donationData = {
        ...formData,
        amount: finalAmount,
        currency: 'RWF'
      };
      
      // Remove empty fields
      delete donationData.customAmount;
      if (donationData.dedicatedTo.length === 0) delete donationData.dedicatedTo;
      if (!donationData.message) delete donationData.message;

      const response = await api.createDonation(donationData);
      
      if (response.success) {
        setSuccess(true);
        setStep(4);
      }
    } catch (err) {
      console.error('Failed to create donation:', err);
      alert('Failed to process donation: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      customAmount: '',
      type: 'one-time',
      category: 'general',
      paymentMethod: 'mobile-money',
      dedicatedTo: [],
      message: '',
      isAnonymous: false
    });
    setStep(1);
    setSuccess(false);
    setPreSelectedChild(null);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[500px]"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-600 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your donation of <span className="font-bold text-green-600">
              {(formData.amount || formData.customAmount).toLocaleString()} RWF
            </span> has been processed successfully.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            You're making a real difference in the lives of children in need.
          </p>
          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Make Another Donation
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'dashboard' }))}
              className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Make a Donation</h1>
        <p className="text-gray-600 mt-1">Support children and families in need</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Amount' },
            { num: 2, label: 'Category' },
            { num: 3, label: 'Payment' }
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s.num}
                </div>
                <span className={`font-medium ${step >= s.num ? 'text-gray-900' : 'text-gray-500'}`}>
                  {s.label}
                </span>
              </div>
              {idx < 2 && (
                <div className={`flex-1 h-1 mx-4 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {preSelectedChild && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900">
            <FaHeart className="inline mr-2 text-blue-600" />
            Donating to support: <span className="font-semibold">{preSelectedChild.childName}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Amount</h2>
              <p className="text-gray-600">Choose a predefined amount or enter your own</p>
            </div>

            {/* Predefined Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.amount === amount
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <p className="text-2xl font-bold text-gray-900">{amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">RWF</p>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter custom amount (RWF)
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={formData.customAmount}
                  onChange={(e) => setFormData({ ...formData, customAmount: e.target.value, amount: '' })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Donation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'one-time', label: 'One-time Donation', description: 'Make a single donation' },
                  { value: 'monthly', label: 'Monthly Recurring', description: 'Donate every month' }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.type === type.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{type.label}</p>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!formData.amount && !formData.customAmount}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              Continue to Category
            </button>
          </motion.div>
        )}

        {/* Step 2: Category Selection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Category</h2>
              <p className="text-gray-600">Choose where your donation will make the most impact</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.category === cat.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{cat.label}</p>
                      <p className="text-sm text-gray-600">{cat.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Optional Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a message (optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share why you're donating..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Anonymous Option */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Make this donation anonymous</span>
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Continue to Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Payment Method</h2>
              <p className="text-gray-600">Choose how you'd like to complete your donation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.paymentMethod === method.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <method.icon className="text-2xl text-gray-600" />
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">{method.label}</p>
                      {method.popular && (
                        <span className="text-xs text-blue-600 font-medium">Popular</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Donation Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">{(formData.amount || formData.customAmount).toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Type</span>
                <span className="font-medium capitalize">{formData.type.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category</span>
                <span className="font-medium capitalize">{formData.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium capitalize">{formData.paymentMethod.replace('-', ' ')}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-blue-600">
                    {(formData.amount || formData.customAmount).toLocaleString()} RWF
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaHeart />
                    Complete Donation
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default MakeDonation;
