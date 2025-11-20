import React from 'react'
import { motion } from 'motion/react'
import heroImage from '../assets/heroImage.jpg' // Ensure you have an appropriate image in this path

const Hero = () => {
  return (
    <div id='home' className='min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-8 sm:pb-12 px-6 sm:px-8 lg:px-12' style={{ backgroundColor: 'var(--off-white)' }}>
      <div className='w-[95%] max-w-7xl mx-auto'>
        
        {/* Rounded Container with Image Background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='relative rounded-3xl overflow-hidden shadow-2xl min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center'
        >
          {/* Background Image */}
          <img 
            src={heroImage} 
            alt='Children and Technology' 
            className='absolute inset-0 w-full h-full object-cover'
          />
          
          {/* Dark Overlay */}
          <div className='absolute inset-0 bg-black/60'></div>

          {/* Content on top of image */}
          <div className='relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='max-w-3xl'
            >
              {/* Headline */}
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold font-secondary mb-4 sm:mb-6 text-white leading-tight'>
                Building a Compassionate Rwanda,<br />
                <span style={{ color: 'var(--beige-accent)' }}>One Child at a Time</span>
              </h1>

              {/* Subheadline */}
              <p className='text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 leading-relaxed'>
                A digital platform connecting NGOs, schools, and caregivers to track and deliver resources to vulnerable children.
              </p>

              {/* CTAs */}
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white transition w-full sm:w-auto text-base sm:text-lg shadow-lg hover:shadow-xl'
                  style={{ backgroundColor: 'var(--navy-blue)' }}
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold border-2 transition w-full sm:w-auto text-base sm:text-lg text-white border-white hover:bg-white hover:text-navy-blue shadow-lg hover:shadow-xl'
                  style={{ borderColor: 'white' }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>

        </motion.div>

      </div>
    </div>
  )
}

export default Hero
