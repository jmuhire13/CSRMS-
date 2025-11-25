import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useUser } from '../context/UserContext'
import apiService from '../../services/api'

const Signup = ({ onSwitchToLogin }) => {
  const { login } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    district: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const roles = [
    { value: 'admin', label: 'System Administrator' },
    { value: 'social-worker', label: 'Social Worker' },
    { value: 'caregiver', label: 'Caregiver' },
    { value: 'donor', label: 'Donor' }
  ]

  const districts = [
    'Kigali', 'Musanze', 'Huye', 'Rubavu', 'Nyagatare', 'Muhanga', 'Karongi', 'Rwamagana'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { confirmPassword, ...userData } = formData
      const response = await apiService.register(userData)
      if (response.success) {
        login(response.user)
        // Navigate based on user role
        const role = response.user.role
        window.location.href = `/portal/dashboard/${role}`
      }
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
          Create Account
        </h2>
        <p className="mt-2" style={{ color: 'var(--para)' }}>
          Join the CSRMS platform
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
            Full Name
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--para)' }} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--pale-blue)' }}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--para)' }} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--pale-blue)' }}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--pale-blue)' }}
          >
            <option value="">Select your role</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
            Phone Number
          </label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--para)' }} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--pale-blue)' }}
              placeholder="+250 788 123 456"
            />
          </div>
        </div>

        {(formData.role === 'social-worker' || formData.role === 'caregiver') && (
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
              District
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--para)' }} />
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--pale-blue)' }}
              >
                <option value="">Select district</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--para)' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--pale-blue)' }}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{ color: 'var(--para)' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
            Confirm Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--para)' }} />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--pale-blue)' }}
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg font-semibold text-white transition"
          style={{ backgroundColor: 'var(--navy-blue)' }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p style={{ color: 'var(--para)' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold hover:underline"
            style={{ color: 'var(--navy-blue)' }}
          >
            Sign in here
          </button>
        </p>
      </div>
    </motion.div>
  )
}

export default Signup