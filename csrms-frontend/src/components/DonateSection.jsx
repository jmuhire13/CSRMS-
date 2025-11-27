import React, { useState } from 'react'
import { motion } from 'motion/react'
import donateImage from '../assets/2.jpeg'

const DonateSection = ({ setActiveSection }) => {
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [donationData, setDonationData] = useState({
    amount: '',
    type: 'one-time',
    program: 'general',
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'card'
  })

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target
      if (name === 'amount' && value && (isNaN(value) || parseFloat(value) < 0)) {
        return
      }
      setDonationData({ ...donationData, [name]: value })
    } catch (error) {
      console.error('Input change error:', error)
    }
  }

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you ${donationData.name}! Your ${donationData.type} donation of $${donationData.amount} for ${donationData.program} has been processed. You will receive a confirmation email shortly.`)
    setShowDonationForm(false)
    setDonationData({ amount: '', type: 'one-time', program: 'general', name: '', email: '', phone: '', paymentMethod: 'card' })
  }

  if (showDonationForm) {
    return (
      <div id='donate' style={{ backgroundColor: 'var(--white)' }}>
        {/* Back Button */}
        <div className='px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-4'>
          <motion.button
            onClick={() => setShowDonationForm(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-6 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-xl'
            style={{ backgroundColor: 'var(--navy-blue)' }}
          >
            ← Back to Donation Info
          </motion.button>
        </div>

        {/* Donation Form */}
        <div className='min-h-screen px-4 py-8' style={{ backgroundColor: 'var(--off-white)' }}>
          <div className='container mx-auto max-w-2xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-white rounded-2xl shadow-lg p-8'
            >
              <h2 className='text-3xl font-bold font-secondary mb-6 text-center' style={{ color: 'var(--navy-blue)' }}>
                Complete Your Donation
              </h2>

              <form onSubmit={handleDonationSubmit} className='space-y-6'>
                {/* Amount Selection */}
                <div>
                  <label className='block text-sm font-semibold mb-3' style={{ color: 'var(--navy-blue)' }}>Donation Amount ($)</label>
                  <div className='grid grid-cols-3 gap-3 mb-3'>
                    {[25, 50, 100, 250, 500, 1000].map(amount => (
                      <button
                        key={amount}
                        type='button'
                        onClick={() => {
                          try {
                            setDonationData({...donationData, amount: amount.toString()})
                          } catch (error) {
                            console.error('Amount selection error:', error)
                          }
                        }}
                        className={`py-2 px-4 rounded-lg border-2 font-semibold transition ${
                          donationData.amount === amount.toString() 
                            ? 'text-white' 
                            : 'text-gray-700 hover:border-blue-300'
                        }`}
                        style={{
                          backgroundColor: donationData.amount === amount.toString() ? 'var(--navy-blue)' : 'transparent',
                          borderColor: donationData.amount === amount.toString() ? 'var(--navy-blue)' : '#d1d5db'
                        }}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type='number'
                    name='amount'
                    value={donationData.amount}
                    onChange={handleInputChange}
                    placeholder='Enter custom amount'
                    className='w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500'
                    required
                  />
                </div>

                {/* Donation Type */}
                <div>
                  <label className='block text-sm font-semibold mb-3' style={{ color: 'var(--navy-blue)' }}>Donation Type</label>
                  <select
                    name='type'
                    value={donationData.type}
                    onChange={handleInputChange}
                    className='w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500'
                    aria-label='Select donation type'
                  >
                    <option value='one-time'>One-Time Donation</option>
                    <option value='monthly'>Monthly Recurring</option>
                    <option value='quarterly'>Quarterly</option>
                    <option value='annually'>Annual</option>
                  </select>
                </div>

                {/* Program Selection */}
                <div>
                  <label className='block text-sm font-semibold mb-3' style={{ color: 'var(--navy-blue)' }}>Support Program</label>
                  <select
                    name='program'
                    value={donationData.program}
                    onChange={handleInputChange}
                    className='w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500'
                  >
                    <option value='general'>General Support</option>
                    <option value='healthcare'>Healthcare & Medical</option>
                    <option value='nutrition'>Nutrition Programs</option>
                    <option value='education'>Education Support</option>
                    <option value='psychosocial'>Psychosocial Care</option>
                    <option value='emergency'>Emergency Relief</option>
                  </select>
                </div>

                {/* Personal Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>Full Name</label>
                    <input
                      type='text'
                      name='name'
                      value={donationData.name}
                      onChange={handleInputChange}
                      className='w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={donationData.email}
                      onChange={handleInputChange}
                      className='w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500'
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    value={donationData.phone}
                    onChange={handleInputChange}
                    className='w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500'
                    required
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className='block text-sm font-semibold mb-3' style={{ color: 'var(--navy-blue)' }}>Payment Method</label>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {[
                      { value: 'card', label: 'Credit Card' },
                      { value: 'bank', label: 'Bank Transfer' },
                      { value: 'paypal', label: 'PayPal' },
                      { value: 'mobile', label: 'Mobile Money' }
                    ].map(method => (
                      <button
                        key={method.value}
                        type='button'
                        onClick={() => {
                          try {
                            setDonationData({...donationData, paymentMethod: method.value})
                          } catch (error) {
                            console.error('Payment method selection error:', error)
                          }
                        }}
                        className={`py-2 px-3 rounded-lg border-2 font-semibold transition text-sm ${
                          donationData.paymentMethod === method.value 
                            ? 'text-white' 
                            : 'text-gray-700 hover:border-blue-300'
                        }`}
                        style={{
                          backgroundColor: donationData.paymentMethod === method.value ? 'var(--navy-blue)' : 'transparent',
                          borderColor: donationData.paymentMethod === method.value ? 'var(--navy-blue)' : '#d1d5db'
                        }}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type='submit'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full py-4 rounded-lg font-semibold text-white text-lg transition shadow-lg hover:shadow-xl'
                  style={{ backgroundColor: '#E74C3C' }}
                >
                  Donate ${donationData.amount || '0'} Now
                </motion.button>

                <p className='text-sm text-center' style={{ color: 'var(--para)' }}>
                  🔒 Your donation is secure and encrypted. You'll receive a receipt via email.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id='donate' style={{ backgroundColor: 'var(--white)' }}>
      {/* Back Button */}
      <div className='px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-4'>
        <motion.button
          onClick={() => setActiveSection('get-involved')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='px-6 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-xl'
          style={{ backgroundColor: 'var(--navy-blue)' }}
        >
          ← Back
        </motion.button>
      </div>

      {/* Hero Section */}
      <div className='pt-16 px-4 pb-12' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
              How to Donate?
            </h1>
            
            <p className='text-base sm:text-lg font-medium mb-6' style={{ color: 'var(--para)' }}>
              Your donation makes a difference.
            </p>
            
            <p className='text-sm sm:text-base leading-relaxed max-w-2xl' style={{ color: 'var(--para)' }}>
              Have a look at the different ways you can donate.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Donation Options */}
      <div className='px-4 py-10' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-8'
          >
            <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
              Choose Your Donation Type
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {/* One-Time */}
              <div className='p-4 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>One-Time</h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>Urgent needs today</p>
              </div>

              {/* Monthly */}
              <div className='p-4 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>Monthly</h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>Consistent impact</p>
              </div>

              {/* Corporate */}
              <div className='p-4 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>Corporate</h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>Scale our reach</p>
              </div>

              {/* Legacy */}
              <div className='p-4 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>Legacy</h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>Forever change</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Donate Online Section */}
      <div className='px-4 py-12' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center'>
            
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='order-2 md:order-1'
            >
              <div className='relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg'>
                <img 
                  src={donateImage} 
                  alt='Donate Online' 
                  className='w-full h-full object-cover'
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='order-1 md:order-2'
            >
              <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
                Donate Now
              </h2>
              
              <p className='text-base mb-4 leading-relaxed' style={{ color: 'var(--para)' }}>
                This is the easiest way to donate.
              </p>
              
              <p className='text-sm sm:text-base leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Choose your campaign, enter the amount, and pay securely via credit card, bank transfer, PayPal, or mobile money.
              </p>

              {/* Benefits List */}
              <div className='mb-6 space-y-3'>
                <div className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                    Real-time tracking via Compassionate Rwanda
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                    85% reaches children directly
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                    Access your donor dashboard
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                    Secure & Rwanda Data Protection compliant
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={() => setShowDonationForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-3 rounded-full font-semibold text-white transition text-base'
                style={{ backgroundColor: '#E74C3C' }}
              >
                Donate now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='px-4 py-12' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Frequently Asked Questions
            </h2>
            
            <div className='space-y-4'>
              <div>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>
                  How much of my donation reaches children?
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  85% directly supports vulnerable children. 15% maintains Compassionate Rwanda infrastructure.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>
                  Can I track where my donation goes?
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  Yes! Your donor dashboard shows real-time resource allocation to beneficiaries.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>
                  Is my information secure?
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  100%. HTTPS encrypted and Rwanda Data Protection Law compliant.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>
                  Can I choose which program to support?
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  Yes! Select healthcare, nutrition, education, or psychosocial support when donating.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-base mb-1' style={{ color: 'var(--navy-blue)' }}>
                  Is my donation tax-deductible?
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  Yes! Contact us for tax documentation and deductibility information.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DonateSection
