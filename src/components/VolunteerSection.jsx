import React from 'react'
import { motion } from 'motion/react'
import volunteerImage1 from '../assets/1.jpeg'
import volunteerImage2 from '../assets/2.jpeg'

const VolunteerSection = ({ setActiveSection }) => {
  return (
    <div id='volunteer' style={{ backgroundColor: 'var(--white)' }}>
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
      <div className='min-h-screen pt-8 px-4 pb-16 flex items-center' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Volunteering
              </h1>
              
              <p className='text-base sm:text-lg md:text-xl leading-relaxed' style={{ color: 'var(--para)' }}>
                Bring your skills—tech or on-ground—to transform child welfare in Rwanda. 
                Scale Compassionate Rwanda and reach vulnerable children in need of healthcare, 
                nutrition, and education.
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
                src={volunteerImage1} 
                alt='Volunteering' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fundraising Content */}
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
                src={volunteerImage2} 
                alt='Volunteer Roles' 
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
                Multiple Ways to Contribute Your Skills
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Compassionate Rwanda needs diverse expertise. Whether you're a software developer, 
                social worker, administrator, or community advocate, your skills directly 
                impact vulnerable children's access to healthcare, nutrition, and education.
              </p>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Social Workers & Field Officers register children's needs in Compassionate Rwanda, 
                update health records, and track resource delivery in real-time. 
                Developers improve the platform. Data analysts create impact reports. 
                Administrators ensure data quality and accountability.
              </p>

              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Together, we reduce resource waste by 30%, improve emergency response 
                times, and ensure no child falls through the cracks. Join our mission 
                to build Compassionate Rwanda through technology and compassion.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className='space-y-6 mb-10'>
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Ready to make impact? Sign up today to join our volunteer network. 
                Whether remote or on-ground, we'll match your skills to where they're 
                needed most. Receive training on Compassionate Rwanda and start transforming child welfare 
                in Rwanda immediately.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full sm:w-auto px-12 py-4 rounded-full font-semibold text-white transition text-lg'
              style={{ backgroundColor: '#E74C3C' }}
            >
              Sign up now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default VolunteerSection
