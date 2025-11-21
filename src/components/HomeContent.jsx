import React from 'react'
import { motion } from 'motion/react'
import { FaHandHoldingHeart, FaBriefcase, FaUsers, FaBlog } from 'react-icons/fa'

const HomeContent = ({ setActiveSection }) => {
  const handleNavigation = (sectionId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActiveSection(sectionId), 300)
  }

  const sections = [
    {
      id: 'get-involved',
      icon: FaHandHoldingHeart,
      title: 'Get Involved',
      description: 'Make a difference through donations, partnerships, volunteering, or legacy giving.',
      color: '#E74C3C'
    },
    {
      id: 'our-work',
      icon: FaBriefcase,
      title: 'Our Work',
      description: 'Learn how we ensure every donation creates maximum impact through quality assurance and transparency.',
      color: '#2C3E5F'
    },
    {
      id: 'about-us',
      icon: FaUsers,
      title: 'About Us',
      description: 'Discover our mission, values, and the dedicated team building a compassionate Rwanda.',
      color: '#8B95A7'
    },
    {
      id: 'blog',
      icon: FaBlog,
      title: 'Blog',
      description: 'Stay updated with our latest stories, impact reports, and technology innovations.',
      color: '#3D5175'
    }
  ]

  return (
    <div id='content' className='pt-24 sm:pt-28 pb-16 sm:pb-20 px-4' style={{ backgroundColor: 'var(--off-white)' }}>
      <div className='container mx-auto max-w-6xl'>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
            Explore Compassionate Rwanda
          </h2>
          <p className='text-lg sm:text-xl max-w-3xl mx-auto' style={{ color: 'var(--para)' }}>
            Discover how we're transforming lives through technology, transparency, and compassion
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => handleNavigation(section.id)}
              className='bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300'
            >
              <div className='flex items-start gap-4'>
                <div 
                  className='w-16 h-16 rounded-2xl flex items-center justify-center shrink-0'
                  style={{ backgroundColor: section.color }}
                >
                  <section.icon className='text-white text-2xl' />
                </div>
                
                <div className='flex-1'>
                  <h3 className='text-2xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
                    {section.title}
                  </h3>
                  <p className='leading-relaxed mb-4' style={{ color: 'var(--para)' }}>
                    {section.description}
                  </p>
                  <motion.span
                    className='inline-flex items-center gap-2 font-semibold'
                    style={{ color: section.color }}
                    whileHover={{ gap: '12px' }}
                  >
                    Explore
                    <span>→</span>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className='mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center'
        >
          <div className='bg-white rounded-3xl p-8 shadow-lg'>
            <h4 className='text-4xl sm:text-5xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
              100%
            </h4>
            <p className='text-lg' style={{ color: 'var(--para)' }}>
              Transparent Tracking
            </p>
          </div>
          
          <div className='bg-white rounded-3xl p-8 shadow-lg'>
            <h4 className='text-4xl sm:text-5xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
              30%
            </h4>
            <p className='text-lg' style={{ color: 'var(--para)' }}>
              Resource Waste Reduction
            </p>
          </div>
          
          <div className='bg-white rounded-3xl p-8 shadow-lg'>
            <h4 className='text-4xl sm:text-5xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
              Real-time
            </h4>
            <p className='text-lg' style={{ color: 'var(--para)' }}>
              Impact Monitoring
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className='mt-16 text-center'
        >
          <div className='bg-white rounded-3xl p-8 sm:p-12 shadow-lg'>
            <h3 className='text-2xl sm:text-3xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
              Ready to Make an Impact?
            </h3>
            <p className='text-lg mb-6 max-w-2xl mx-auto' style={{ color: 'var(--para)' }}>
              Join us in building a compassionate Rwanda where every child has access to the resources they need to thrive.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <motion.a
                href="#portal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 rounded-full font-semibold transition text-lg shadow-lg hover:shadow-xl text-center text-navy-blue bg-white border-2'
                style={{ color: 'var(--navy-blue)', borderColor: 'var(--navy-blue)' }}
              >
                Access CSRMS Portal
              </motion.a>
              <motion.button
                onClick={() => handleNavigation('get-involved')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 rounded-full font-semibold text-white transition text-lg shadow-lg hover:shadow-xl'
                style={{ backgroundColor: 'var(--navy-blue)' }}
              >
                Get Involved Today
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default HomeContent
