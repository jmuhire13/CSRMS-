import React from 'react'
import { motion } from 'motion/react'
import operateImage1 from '../assets/1.jpeg'
import operateImage2 from '../assets/2.jpeg'

const HowWeOperateSection = ({ setActiveSection }) => {
  return (
    <div id='how-we-operate' style={{ backgroundColor: 'var(--white)' }}>
      {/* Back Button */}
      <div className='px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-4'>
        <motion.button
          onClick={() => setActiveSection('our-work')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='px-6 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-xl'
          style={{ backgroundColor: 'var(--navy-blue)' }}
        >
          ← Back
        </motion.button>
      </div>

      {/* Hero Section */}
      <div className='min-h-screen pt-8 px-4 pb-16 flex items-center' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-sm sm:text-base font-semibold mb-4' style={{ color: 'var(--para)' }}>
              Our work
            </p>
            
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
              How we operate
            </h1>
            
            <p className='text-lg sm:text-xl md:text-2xl font-medium mb-8' style={{ color: 'var(--para)' }}>
              Ensuring every donation reaches vulnerable children in Rwanda
            </p>
            
            <p className='text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl' style={{ color: 'var(--para)' }}>
              Learn how Compassionate Rwanda enables us to identify child needs, match resources 
              efficiently, and deliver healthcare, nutrition, and education with 
              unprecedented transparency and accountability.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quality Assurance Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'
            >
              <img 
                src={operateImage1} 
                alt='Quality Assurance' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Quality Assurance & Monitoring
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Compassionate Rwanda enables us to register vulnerable children, track their needs in 
                real-time, and ensure resources are allocated efficiently. Through NGO 
                partners, schools, and clinics, we monitor healthcare, nutrition, and 
                education outcomes continuously.
              </p>
              
              <ul className='space-y-3'>
                <li className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <span className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Child registration and needs profiling via Compassionate Rwanda
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <span className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Real-time resource inventory and allocation tracking
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <span className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Immediate alerts for emergency cases and critical needs
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <span className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Outcome tracking: improved access to healthcare, nutrition, education
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Effective Resource Management */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='order-2 md:order-1'
            >
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Intelligent Resource Matching
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Compassionate Rwanda matches children's needs with available resources intelligently, 
                eliminating waste and delays. Our digital platform reduces resource 
                waste by up to 30% through automated need-resource matching and 
                transparent tracking.
              </p>
              
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Resources reach vulnerable children faster when NGOs, schools, and 
                caregivers use one integrated system. No duplication. No delays. 
                Just measurable impact.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg order-1 md:order-2'
            >
              <img 
                src={operateImage2} 
                alt='Resource Management' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: Transparency & Accountability */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Full Transparency & Accountability
            </h2>
            
            <p className='text-base sm:text-lg leading-relaxed mb-8' style={{ color: 'var(--para)' }}>
              Compassionate Rwanda provides real-time dashboards for donors, NGOs, and administrators. 
              See exactly how resources flow from donation → registration → allocation 
              → delivery to children. Rwanda Data Protection Law ensures child safety 
              and donor privacy throughout.
            </p>
            
            <motion.a
              href="#portal"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-block px-8 py-4 rounded-full font-semibold text-white transition text-lg shadow-lg hover:shadow-xl mb-8'
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              View Live Dashboard
            </motion.a>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
              <div className='p-6 rounded-2xl' style={{ backgroundColor: 'var(--off-white)' }}>
                <h3 className='text-3xl sm:text-4xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                  0
                </h3>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Missed Children
                </p>
                <p className='text-xs mt-1' style={{ color: 'var(--para)' }}>
                  Every child registered & tracked
                </p>
              </div>
              
              <div className='p-6 rounded-2xl' style={{ backgroundColor: 'var(--off-white)' }}>
                <h3 className='text-3xl sm:text-4xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                  ↓ 30%
                </h3>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Waste Reduction
                </p>
                <p className='text-xs mt-1' style={{ color: 'var(--para)' }}>
                  Intelligent resource matching
                </p>
              </div>
              
              <div className='p-6 rounded-2xl' style={{ backgroundColor: 'var(--off-white)' }}>
                <h3 className='text-3xl sm:text-4xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                  ✓
                </h3>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Measurable Impact
                </p>
                <p className='text-xs mt-1' style={{ color: 'var(--para)' }}>
                  Healthcare, nutrition, education tracked
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setTimeout(() => setActiveSection('about-us'), 300)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-10 py-4 rounded-full font-semibold text-white transition text-lg'
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              Explore Our Impact
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HowWeOperateSection
