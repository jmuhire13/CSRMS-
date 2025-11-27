import React from 'react'
import { motion } from 'motion/react'
import { FaHandHoldingHeart, FaHandshake, FaGem, FaUsers } from 'react-icons/fa'
import rwandaMap from '../assets/Rwanda_map.png'

const coverImage = 'https://images.pexels.com/photos/3277188/pexels-photo-3277188.jpeg'

const Get_involved = ({ setActiveSection }) => {
  
  const handleCardClick = (route) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActiveSection(route), 300)
  }

  const cards = [
    {
      id: 1,
      route: 'donate',
      icon: FaHandHoldingHeart,
      title: 'Donate Now',
      description: "Whether it's a one-off donation or monthly contribution, every shilling is tracked and transparent. Through Compassionate Rwanda, our digital platform, see exactly how your donation reduces waste by up to 30%, reaches vulnerable children, and provides healthcare, nutrition, and education with real-time accountability.",
      color: '#2C3E5F'
    },
    {
      id: 2,
      route: 'partner',
      icon: FaHandshake,
      title: 'Companies Committed to Our Cause',
      description: 'Together, we can scale impact. Corporate partnerships fund Compassionate Rwanda infrastructure, reduce resource waste, and ensure vulnerable children receive healthcare, nutrition, and education. From financial sponsorships to tech skills, discover how your company can drive sustainable change.',
      color: '#8B95A7'
    },
    {
      id: 3,
      route: 'legacy',
      icon: FaGem,
      title: 'Legacies & Inheritance',
      description: 'Leave a lasting legacy that transforms child welfare for generations. Endow Compassionate Rwanda itself—the platform that ensures no child falls through the cracks. Your legacy funds the system creating perpetual impact, guaranteeing vulnerable children access to resources and support forever.',
      color: '#3D5175'
    },
    {
      id: 4,
      route: 'volunteer',
      icon: FaUsers,
      title: 'Volunteering',
      description: "Bring your skills—whether you're a software developer scaling Compassionate Rwanda, a social worker registering vulnerable children, an administrator tracking resources, or a community advocate. Help us reach more children. Remote or on-the-ground, find your role in transforming child welfare.",
      color: '#2C3E5F'
    }
  ]

  return (
    <div id='get-involved' className='min-h-screen' style={{ backgroundColor: 'var(--off-white)' }}>
      {/* Hero Cover Image with Centered Text */}
      <div className='relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden'>
        {/* Background Image */}
        <img 
          src={coverImage} 
          alt='Get Involved Cover' 
          className='absolute inset-0 w-full h-full object-cover object-top'
        />
        
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/60'></div>

        {/* Centered Text Content */}
        <div className='relative z-10 h-full flex flex-col items-center justify-center px-4 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary mb-3 text-white'
          >
            Get Involved
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-lg sm:text-xl md:text-2xl font-medium text-white max-w-3xl'
          >
            Multiple Ways to Build Compassionate Rwanda
          </motion.p>
        </div>
      </div>

      {/* Rwanda Map Card Section */}
      <div className='px-4 py-8 md:py-12'>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-white rounded-2xl shadow-xl overflow-hidden'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
              {/* Rwanda Map */}
              <div className='p-4 md:p-6 flex items-center justify-center'>
                <img 
                  src={rwandaMap} 
                  alt='Map of Rwanda' 
                  className='w-full h-auto'
                />
              </div>

              {/* Description Text */}
              <div className='p-6 md:p-8 md:pr-10'>
                <p className='text-sm md:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
                  Discover all the ways you can get involved with us: donations, partnerships, legacy giving, or volunteering. Together, we're using technology to transform child welfare in Rwanda—one child at a time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Four Cards Section - 2x2 Grid with New Design */}
      <div className='px-4 pb-12 md:pb-16'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6'>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onClick={() => handleCardClick(card.route)}
                className='bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 border-t-4'
                style={{ borderTopColor: card.color }}
              >
                {/* Title */}
                <h3 className='text-lg font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className='text-sm leading-relaxed mb-4' style={{ color: 'var(--para)' }}>
                  {card.description}
                </p>

                {/* Learn More Link */}
                <motion.div
                  className='inline-flex items-center gap-2 font-semibold text-sm'
                  style={{ color: card.color }}
                  whileHover={{ gap: '12px' }}
                >
                  Learn More
                  <span>→</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Get_involved
