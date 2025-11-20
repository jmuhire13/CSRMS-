import React from 'react'
import { motion } from 'motion/react'
import donateImage from '../assets/2.jpeg'

const DonateSection = ({ setActiveSection }) => {
  return (
    <div id='donate' style={{ backgroundColor: 'var(--white)' }}>
      {/* Hero Section */}
      <div className='min-h-screen pt-32 px-4 pb-16 flex items-center' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-sm sm:text-base font-semibold mb-4' style={{ color: 'var(--para)' }}>
              Get involved
            </p>
            
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
              How to donate?
            </h1>
            
            <p className='text-lg sm:text-xl md:text-2xl font-medium mb-8' style={{ color: 'var(--para)' }}>
              Your donation makes a difference.
            </p>
            
            <p className='text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl' style={{ color: 'var(--para)' }}>
              Have a look at the different ways you can donate.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Back Button */}
      <div className='px-4 pt-8 pb-4'>
        <div className='container mx-auto max-w-5xl'>
          <motion.button
            onClick={() => setActiveSection('get-involved')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-6 py-2 rounded-full font-semibold transition'
            style={{ backgroundColor: 'var(--beige-accent)', color: 'var(--white)' }}
          >
            ← Back
          </motion.button>
        </div>
      </div>

      {/* Donation Options */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Choose Your Donation Type
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* One-Time */}
              <div className='p-6 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>One-Time</h3>
                <p style={{ color: 'var(--para)' }}>Urgent needs today</p>
              </div>

              {/* Monthly */}
              <div className='p-6 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>Monthly</h3>
                <p style={{ color: 'var(--para)' }}>Consistent impact</p>
              </div>

              {/* Corporate */}
              <div className='p-6 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>Corporate</h3>
                <p style={{ color: 'var(--para)' }}>Scale our reach</p>
              </div>

              {/* Legacy */}
              <div className='p-6 rounded-lg' style={{ backgroundColor: 'var(--white)' }}>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>Legacy</h3>
                <p style={{ color: 'var(--para)' }}>Forever change</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Donate Online Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='order-2 md:order-1'
            >
              <div className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'>
                <img 
                  src={donateImage} 
                  alt='Donate Online' 
                  className='w-full h-full object-cover'
                  style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
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
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Donate Now
              </h2>
              
              <p className='text-lg mb-6 leading-relaxed' style={{ color: 'var(--para)' }}>
                This is the easiest way to donate.
              </p>
              
              <p className='text-base sm:text-lg leading-relaxed mb-8' style={{ color: 'var(--para)' }}>
                Choose your campaign, enter the amount, and pay securely via credit card, 
                bank transfer, PayPal, or mobile money.
              </p>

              {/* Benefits List */}
              <div className='mb-8 space-y-4'>
                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Real-time tracking via Compassionate Rwanda
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    85% reaches children directly
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Access your donor dashboard
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Secure & Rwanda Data Protection compliant
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-10 py-4 rounded-full font-semibold text-white transition text-lg'
                style={{ backgroundColor: '#E74C3C' }}
              >
                Donate now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-12' style={{ color: 'var(--navy-blue)' }}>
              Frequently Asked Questions
            </h2>
            
            <div className='space-y-6'>
              <div>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                  How much of my donation reaches children?
                </h3>
                <p style={{ color: 'var(--para)' }}>
                  85% directly supports vulnerable children. 15% maintains Compassionate Rwanda infrastructure.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                  Can I track where my donation goes?
                </h3>
                <p style={{ color: 'var(--para)' }}>
                  Yes! Your donor dashboard shows real-time resource allocation to beneficiaries.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                  Is my information secure?
                </h3>
                <p style={{ color: 'var(--para)' }}>
                  100%. HTTPS encrypted and Rwanda Data Protection Law compliant.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                  Can I choose which program to support?
                </h3>
                <p style={{ color: 'var(--para)' }}>
                  Yes! Select healthcare, nutrition, education, or psychosocial support when donating.
                </p>
              </div>

              <div>
                <h3 className='font-bold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                  Is my donation tax-deductible?
                </h3>
                <p style={{ color: 'var(--para)' }}>
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
