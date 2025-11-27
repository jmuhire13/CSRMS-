import React from 'react'
import { motion } from 'motion/react'
import { FaHeart, FaUsers, FaHandsHelping, FaAward } from 'react-icons/fa'

const aboutImage = 'https://images.pexels.com/photos/7880599/pexels-photo-7880599.jpeg'

const About = ({ setActiveSection }) => {
  const handleCardClick = (cardId) => {
    const routes = {
      1: 'our-mission',
      2: 'governance-team'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActiveSection(routes[cardId]), 300)
  }

  const values = [
    {
      icon: FaHeart,
      title: 'Compassion First',
      description: 'Every decision we make is centered on the well-being and dignity of vulnerable children'
    },
    {
      icon: FaUsers,
      title: 'Community-Driven',
      description: 'We work hand-in-hand with local communities, caregivers, and organizations'
    },
    {
      icon: FaHandsHelping,
      title: 'Transparent & Accountable',
      description: 'Every resource tracked, every impact measured, ensuring trust and effectiveness'
    },
    {
      icon: FaAward,
      title: 'Excellence in Service',
      description: 'Committed to delivering the highest quality care and support to those who need it most'
    }
  ]

  return (
    <div id='about-us' className='min-h-screen pt-32 sm:pt-36 px-4 pb-12' style={{ backgroundColor: 'var(--off-white)' }}>
      <div className='container mx-auto max-w-6xl'>
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-8 text-center'
        >
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
            About Us
          </h1>
          <p className='text-base sm:text-lg max-w-2xl mx-auto' style={{ color: 'var(--para)' }}>
            Building a compassionate future for Rwanda's most vulnerable children
          </p>
        </motion.div>

        {/* Hero Image with Overlay Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative mb-10 rounded-2xl overflow-hidden shadow-xl'
        >
          <div className='relative h-[350px] sm:h-[400px] md:h-[450px]'>
            <img 
              src={aboutImage} 
              alt='About Us' 
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
            
            <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold font-secondary mb-3'>
                Who We Are
              </h2>
              <p className='text-sm sm:text-base max-w-2xl leading-relaxed mb-4'>
                Compassionate Rwanda is dedicated to transforming child welfare through innovative technology, 
                transparent resource management, and unwavering commitment to vulnerable children across the nation. 
                Discover the values, mission, and dedicated team behind our impact.
              </p>
              <div className='flex flex-wrap gap-3'>
                <motion.button
                  onClick={() => handleCardClick(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-6 py-2.5 bg-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300'
                  style={{ color: 'var(--navy-blue)' }}
                >
                  Our Mission →
                </motion.button>
                <motion.button
                  onClick={() => handleCardClick(2)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-6 py-2.5 bg-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300'
                  style={{ color: 'var(--navy-blue)' }}
                >
                  Our Team →
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className='flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4'
              style={{ borderTopColor: 'var(--navy-blue)' }}
            >
              <div 
                className='w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'
                style={{ backgroundColor: 'var(--navy-blue)' }}
              >
                <value.icon className='text-white text-xl' />
              </div>
              <div>
                <h3 className='text-base font-bold mb-1.5' style={{ color: 'var(--navy-blue)' }}>
                  {value.title}
                </h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--para)' }}>
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className='text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4'
          style={{ borderTopColor: 'var(--navy-blue)' }}
        >
          <h3 className='text-xl sm:text-2xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
            Learn More About Our Impact
          </h3>
          <p className='text-sm sm:text-base max-w-2xl mx-auto mb-5' style={{ color: 'var(--para)' }}>
            Compassionate Rwanda is committed, humane, transparent and effective. 
            Explore our mission, values, and the dedicated team making a difference every day.
          </p>
          <div className='flex flex-wrap gap-3 justify-center'>
            <motion.button
              onClick={() => handleCardClick(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md'
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              Explore Our Mission
            </motion.button>
            <motion.button
              onClick={() => handleCardClick(2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 border-2'
              style={{ backgroundColor: 'white', color: 'var(--navy-blue)', borderColor: 'var(--navy-blue)' }}
            >
              Meet Our Team
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default About
