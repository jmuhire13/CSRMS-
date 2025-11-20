import React from 'react'
import { motion } from 'motion/react'
import legacyImage1 from '../assets/1.jpeg'
import legacyImage2 from '../assets/2.jpeg'

const LegacySection = ({ setActiveSection }) => {
  return (
    <div id='legacy' style={{ backgroundColor: 'var(--white)' }}>
      {/* Hero Section */}
      <div className='min-h-screen pt-32 px-4 pb-16 flex items-center' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Inheritance and Testament
              </h1>
              
              <p className='text-base sm:text-lg md:text-xl leading-relaxed' style={{ color: 'var(--para)' }}>
                Would you like to ensure vulnerable children in Rwanda have 
                access to healthcare, nutrition, and education forever? Leave 
                a lasting legacy by endowing Compassionate Rwanda—the digital platform that 
                guarantees no child falls through the cracks, generation after generation.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'
            >
              <img 
                src={legacyImage1} 
                alt='Inheritance and Testament' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>
          </div>
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

      {/* Section 1: Show Your Solidarity */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Show your solidarity, even after your passing
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Your legacy transforms child welfare in Rwanda. By endowing Compassionate Rwanda, 
                you create a perpetual system that registers children's needs, 
                matches them with resources, and delivers healthcare, nutrition, 
                and education with real-time transparency—forever.
              </p>
              
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Your bequest ensures the platform runs indefinitely, reaching 
                more vulnerable children each year while reducing resource waste 
                by 30% through intelligent digital tracking.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'
            >
              <img 
                src={legacyImage2} 
                alt='Show Your Solidarity' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Your Will, Your Decision */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg order-2 md:order-1'
            >
              <img 
                src={legacyImage1} 
                alt='Your Will Decision' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='order-1 md:order-2'
            >
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Your will, your decision
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Compassionate Rwanda ensures every shilling of your legacy reaches vulnerable 
                children. Our digital platform provides transparent tracking of 
                resource allocation, child outcomes, and impact metrics—all compliant 
                with Rwanda Data Protection Law.
              </p>
              
              <p className='text-base sm:text-lg leading-relaxed mt-6' style={{ color: 'var(--para)' }}>
                By endowing Compassionate Rwanda itself, your legacy funds the infrastructure 
                that makes accountability possible. Your support scales with demand, 
                reaching exponentially more children as the platform grows.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: Practical Information */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-12' style={{ color: 'var(--navy-blue)' }}>
              Practical information at your disposal
            </h2>
            
            <div className='space-y-8'>
              {/* NEW: Endowment Options */}
              <div>
                <h3 className='text-2xl sm:text-3xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                  Endowment Options
                </h3>
                
                <div className='space-y-6'>
                  <div>
                    <p className='font-semibold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                      Endow Compassionate Rwanda Platform
                    </p>
                    <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                      Fund platform maintenance, server infrastructure, cybersecurity, and system upgrades. 
                      Your legacy ensures the platform scales to reach all vulnerable children in Rwanda.
                    </p>
                  </div>

                  <div>
                    <p className='font-semibold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                      Endow Child Support Programs
                    </p>
                    <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                      Fund healthcare, nutrition, education, or psychosocial support programs tracked 
                      via Compassionate Rwanda. Choose your focus area and watch real-time impact on children's lives.
                    </p>
                  </div>

                  <div>
                    <p className='font-semibold text-lg mb-2' style={{ color: 'var(--navy-blue)' }}>
                      Endow Emergency Response
                    </p>
                    <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                      Create a perpetual fund for crisis response. Compassionate Rwanda instantly identifies children 
                      in need during emergencies, ensuring rapid, transparent support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Existing: Create Your Will */}
              <div className='border-t pt-8'>
                <h3 className='text-2xl sm:text-3xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
                  Create your will online
                </h3>
                
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Via the online portal, you can describe your personal situation, calculate any compulsory portions and create a sample will. You must then write it down by hand, date it and sign it for it to be valid. You can also find an example here:
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='mt-8 px-10 py-4 rounded-full font-semibold text-white transition text-lg'
                  style={{ backgroundColor: '#E74C3C' }}
                >
                  Create Your Will
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className='text-2xl sm:text-3xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Ready to transform child welfare in Rwanda for generations?
            </h3>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-10 py-4 rounded-full font-semibold text-white transition text-lg'
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              Create Your Endowment Today
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LegacySection
