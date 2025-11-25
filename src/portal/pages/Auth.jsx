import React, { useState } from 'react'
import { motion } from 'motion/react'
import Login from './Login'
import Signup from './Signup'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <div className="mb-8">
              <img src="/logo.svg" alt="CSRMS Logo" className="w-20 h-20 mx-auto lg:mx-0 mb-6" />
              <h1 className="text-4xl lg:text-5xl font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
                Compassionate Rwanda
              </h1>
              <p className="text-xl mb-6" style={{ color: 'var(--para)' }}>
                Management System Portal
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--para)' }}>
                Empowering communities through comprehensive child support management. 
                Join our platform to make a difference in children's lives across Rwanda.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--white)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--navy-blue)' }}>500+</div>
                <div className="text-sm" style={{ color: 'var(--para)' }}>Children Supported</div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--white)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--navy-blue)' }}>50+</div>
                <div className="text-sm" style={{ color: 'var(--para)' }}>Active Workers</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            {isLogin ? (
              <Login onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <Signup onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Auth