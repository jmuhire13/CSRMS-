import React, { useState } from 'react'
import { motion } from 'motion/react'
import Login from './Login'
import Signup from './Signup'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="w-full max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6 md:mb-8">
              <img src="/logo.svg" alt="CSRMS Logo" className="w-16 h-16 md:w-20 md:h-20 mx-auto lg:mx-0 mb-4 md:mb-6" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-secondary mb-3 md:mb-4" style={{ color: 'var(--navy-blue)' }}>
                Compassionate Rwanda
              </h1>
              <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6" style={{ color: 'var(--para)' }}>
                Management System Portal
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed" style={{ color: 'var(--para)' }}>
                Empowering communities through comprehensive child support management. 
                Join our platform to make a difference in children's lives across Rwanda.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-6 text-center">
              <div className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: 'var(--white)' }}>
                <div className="text-xl md:text-2xl font-bold" style={{ color: 'var(--navy-blue)' }}>500+</div>
                <div className="text-xs md:text-sm" style={{ color: 'var(--para)' }}>Children Supported</div>
              </div>
              <div className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: 'var(--white)' }}>
                <div className="text-xl md:text-2xl font-bold" style={{ color: 'var(--navy-blue)' }}>50+</div>
                <div className="text-xs md:text-sm" style={{ color: 'var(--para)' }}>Active Workers</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8"
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