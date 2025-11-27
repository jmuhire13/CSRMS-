import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa'
import { useUser } from '../context/UserContext'
import apiService from '../services/api'

const Login = ({ onSwitchToSignup }) => {
  const { login } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await apiService.login(formData.email, formData.password)
      if (response.success) {
        login(response.user, response.requirePasswordChange)
        
        // Check if password change is required
        if (response.requirePasswordChange) {
          window.location.href = '/portal/change-password'
        } else {
          // Navigate based on user role
          const role = response.user.role
          window.location.href = `/portal/dashboard/${role}`
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed')
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
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
          Welcome Back
        </h2>
        <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--para)' }}>
          Sign in to access your portal
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-gray-100 border border-gray-300 text-sm">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-xs md:text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
            Email Address
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm" style={{ color: 'var(--para)' }} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'var(--pale-blue)',
                focusRingColor: 'var(--navy-blue)'
              }}
              placeholder="Enter your email"
            />
          </div>
        </div>

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
              style={{ 
                borderColor: 'var(--pale-blue)',
                focusRingColor: 'var(--navy-blue)'
              }}
              placeholder="Enter your password"
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

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg font-semibold text-white transition"
          style={{ backgroundColor: 'var(--navy-blue)' }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p style={{ color: 'var(--para)' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="font-semibold hover:underline"
            style={{ color: 'var(--navy-blue)' }}
          >
            Sign up here
          </button>
        </p>
      </div>
    </motion.div>
  )
}

export default Login