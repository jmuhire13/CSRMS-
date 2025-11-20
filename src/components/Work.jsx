import React from 'react'
import { motion } from 'motion/react'
import workImage from '../assets/1.jpeg'

const Work = ({ setActiveSection }) => {
  const handleCardClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActiveSection('how-we-operate'), 300)
  }

  return (
    <div id='our-work' className='min-h-screen pt-32 px-4 pb-16' style={{ backgroundColor: 'var(--white)' }}>
      <div className='container mx-auto max-w-6xl'>
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-12 text-center'
        >
          <p className='text-sm sm:text-base font-medium mb-4' style={{ color: 'var(--para)' }}>
            From Registration to Impact
          </p>
          
          <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
            Our work
          </h1>
        </motion.div>

        {/* Content Grid - Card on Left, Image & Description on Right */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
          
          {/* Left - Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='order-2 md:order-1'
          >
            <motion.button
              onClick={handleCardClick}
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className='w-full text-left p-8 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl'
              style={{ backgroundColor: 'var(--beige-accent)' }}
            >
              <div className='flex items-start gap-4 mb-4'>
                <span className='text-4xl' style={{ color: 'var(--navy-blue)' }}>→</span>
                <h3 className='text-2xl sm:text-3xl font-bold font-secondary' style={{ color: 'var(--navy-blue)' }}>
                  How We Operate
                </h3>
              </div>
              
              <p className='text-sm sm:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
                See how Compassionate Rwanda identifies vulnerable children, matches resources to needs, 
                and delivers healthcare, nutrition, and education with real-time transparency. 
                Reduce waste by 30% through intelligent digital resource management.
              </p>
            </motion.button>
          </motion.div>

          {/* Right - Image & Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='order-1 md:order-2 flex flex-col items-center'
          >
            <div className='relative w-full max-w-sm h-64 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-lg mb-6'>
              <img 
                src={workImage} 
                alt='Our Work' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </div>
            
            <div className='text-center max-w-md'>
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Learn how Compassionate Rwanda connects NGOs, schools, clinics, and caregivers to 
                identify child needs, allocate resources instantly, and track outcomes 
                in real-time. Every child counted. Every shilling tracked.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Work
