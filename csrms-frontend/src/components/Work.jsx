import React from 'react'
import { motion } from 'motion/react'
import { FaCheck, FaChartLine, FaUsers, FaHandHoldingHeart } from 'react-icons/fa'

const workImage = 'https://images.pexels.com/photos/6646988/pexels-photo-6646988.jpeg'

const Work = ({ setActiveSection }) => {
  const handleLearnMore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActiveSection('how-we-operate'), 300)
  }

  const features = [
    {
      icon: FaUsers,
      title: 'Child Identification',
      description: 'We identify vulnerable children through our network of social workers and community advocates'
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Resource Matching',
      description: 'Intelligent matching of available resources to children\'s specific needs in real-time'
    },
    {
      icon: FaChartLine,
      title: 'Real-time Tracking',
      description: 'Every donation and resource allocation tracked with complete transparency and accountability'
    },
    {
      icon: FaCheck,
      title: 'Impact Measurement',
      description: 'Measurable outcomes showing 30% reduction in waste through digital resource management'
    }
  ]

  return (
    <div id='our-work' className='min-h-screen pt-32 sm:pt-36 px-4 pb-12' style={{ backgroundColor: 'var(--off-white)' }}>
      <div className='container mx-auto max-w-6xl'>
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-8 text-center'
        >
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
            Our Work
          </h1>
          <p className='text-base sm:text-lg max-w-2xl mx-auto' style={{ color: 'var(--para)' }}>
            Transforming child welfare through technology and transparent resource management
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
              src={workImage} 
              alt='Our Work' 
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
            
            <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold font-secondary mb-3'>
                Compassionate Rwanda in Action
              </h2>
              <p className='text-sm sm:text-base max-w-2xl leading-relaxed mb-4'>
                Learn how Compassionate Rwanda connects NGOs, schools, clinics, and caregivers to identify child needs, 
                allocate resources instantly, and track outcomes in real-time. Every child counted. Every shilling tracked.
              </p>
              <motion.button
                onClick={handleLearnMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-6 py-2.5 bg-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300'
                style={{ color: 'var(--navy-blue)' }}
              >
                How We Operate →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className='flex gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              <div 
                className='w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'
                style={{ backgroundColor: 'var(--navy-blue)' }}
              >
                <feature.icon className='text-white text-xl' />
              </div>
              <div>
                <h3 className='text-base font-bold mb-1.5' style={{ color: 'var(--navy-blue)' }}>
                  {feature.title}
                </h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--para)' }}>
                  {feature.description}
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
          className='text-center bg-white rounded-2xl p-8 shadow-lg'
        >
          <h3 className='text-xl sm:text-2xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
            Ready to Make a Difference?
          </h3>
          <p className='text-sm sm:text-base max-w-2xl mx-auto mb-5' style={{ color: 'var(--para)' }}>
            See how Compassionate Rwanda identifies vulnerable children, matches resources to needs, 
            and delivers healthcare, nutrition, and education with real-time transparency.
          </p>
          <motion.button
            onClick={handleLearnMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-3 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md'
            style={{ backgroundColor: 'var(--navy-blue)' }}
          >
            Explore How We Operate
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}

export default Work
