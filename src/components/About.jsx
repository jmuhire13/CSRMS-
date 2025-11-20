import React from 'react'
import { motion } from 'motion/react'
import aboutImage from '../assets/1.jpeg'

const About = ({ setActiveSection }) => {
  const handleCardClick = (cardId) => {
    const routes = {
      1: 'our-mission',
      2: 'governance-team'
    }
    setActiveSection(routes[cardId])
  }

  return (
    <div id='about-us' className='min-h-screen pt-32 px-4 pb-16' style={{ backgroundColor: 'var(--white)' }}>
      <div className='container mx-auto max-w-6xl'>
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-12 text-center'
        >
          <p className='text-sm sm:text-base font-medium mb-4' style={{ color: 'var(--para)' }}>
            Who we are
          </p>
          
          <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
            About us
          </h1>
        </motion.div>

        {/* Content Grid - Cards on Left, Image & Description on Right */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
          
          {/* Left - Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='order-2 md:order-1 space-y-6'
          >
            {/* Card 1: Our Mission */}
            <motion.button
              onClick={() => handleCardClick(1)}
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className='w-full text-left p-8 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl'
              style={{ backgroundColor: 'var(--beige-accent)' }}
            >
              <div className='flex items-start gap-4 mb-4'>
                <span className='text-4xl' style={{ color: 'var(--navy-blue)' }}>→</span>
                <h3 className='text-2xl sm:text-3xl font-bold font-secondary' style={{ color: 'var(--navy-blue)' }}>
                  Our mission
                </h3>
              </div>
              
              <p className='text-sm sm:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
                Compassionate Rwanda is committed, humane, transparent and effective. Find out more about the values and principles that guide our actions.
              </p>
            </motion.button>

            {/* Card 2: Governance and Team */}
            <motion.button
              onClick={() => handleCardClick(2)}
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className='w-full text-left p-8 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl'
              style={{ backgroundColor: 'var(--beige-accent)' }}
            >
              <div className='flex items-start gap-4 mb-4'>
                <span className='text-4xl' style={{ color: 'var(--navy-blue)' }}>→</span>
                <h3 className='text-2xl sm:text-3xl font-bold font-secondary' style={{ color: 'var(--navy-blue)' }}>
                  Governance and Team
                </h3>
              </div>
              
              <p className='text-sm sm:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
                Find out more about the people who continue and strengthen Compassionate Rwanda every day.
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
                src={aboutImage} 
                alt='About Us' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </div>
            
            <div className='text-center max-w-md'>
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Discover the values, mission, and dedicated team behind Compassionate Rwanda's commitment to vulnerable children across the nation.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default About
