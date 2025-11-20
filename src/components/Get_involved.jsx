import React, { useState } from 'react'
import { motion } from 'motion/react'
import heroImage from '../assets/2.jpeg'

const Get_involved = ({ setActiveSection }) => {
  const [selectedCard, setSelectedCard] = useState(null)
  
  const handleCardClick = (cardId) => {
    const routes = {
      1: 'donate',
      2: 'partner',
      3: 'legacy',
      4: 'volunteer'
    }
    setActiveSection(routes[cardId])
  }
  const cards = [
    {
      id: 1,
      title: 'Donate Now',
      description: "Whether it's a one-off donation or monthly contribution, every shilling is tracked and transparent. Through Compassionate Rwanda, our digital platform, see exactly how your donation reduces waste by up to 30%, reaches vulnerable children, and provides healthcare, nutrition, and education with real-time accountability."
    },
    {
      id: 2,
      title: 'Companies Committed to Our Cause',
      description: 'Together, we can scale impact. Corporate partnerships fund Compassionate Rwanda infrastructure, reduce resource waste, and ensure vulnerable children receive healthcare, nutrition, and education. From financial sponsorships to tech skills, discover how your company can drive sustainable change.'
    },
    {
      id: 3,
      title: 'Legacies & Inheritance',
      description: 'Leave a lasting legacy that transforms child welfare for generations. Endow Compassionate Rwanda itself—the platform that ensures no child falls through the cracks. Your legacy funds the system creating perpetual impact, guaranteeing vulnerable children access to resources and support forever.'
    },
    {
      id: 4,
      title: 'Volunteering',
      description: "Bring your skills—whether you're a software developer scaling Compassionate Rwanda, a social worker registering vulnerable children, an administrator tracking resources, or a community advocate. Help us reach more children. Remote or on-the-ground, find your role in transforming child welfare."
    }
  ]

  return (
    <div id='get-involved' className='min-h-screen' style={{ backgroundColor: 'var(--white)' }}>
      {/* Header */}
      <div className='pt-24 sm:pt-28 md:pt-32 px-4 pb-8 md:pb-12'>
        <div className='container mx-auto'>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary space-y-3.5'
            style={{ color: 'var(--navy-blue)' }}
          >
            Get involved
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='text-lg sm:text-xl md:text-2xl font-semibold mt-2 space-y-2'
            style={{ color: 'var(--para)' }}
          >
            Multiple Ways to Build Compassionate Rwanda
          </motion.p>
        </div>
      </div>

      {/* Main Section - Cards on Left, Image + Text on Right */}
      <div className='px-4 pb-12 md:pb-16'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start'>
          
          {/* Left - Cards List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='space-y-3 md:space-y-5 order-2 md:order-1'
          >
            {cards.map((card, index) => (
              <motion.button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='w-full p-4 rounded-b-md shadow-sm cursor-pointer transition duration-300 hover:shadow-md text-left'
                style={{ 
                  backgroundColor: 'var(--beige-accent)',
                  borderLeft: '4px solid var(--navy-blue)',
                  border: 'none'
                }}
                whileHover={{ x: 4 }}
              >
                {/* Card Header */}
                <h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                  → {card.title}
                </h3>
                
                {/* Card Description */}
                <p className='text-xs sm:text-sm md:text-base leading-6 md:leading-7' style={{ color: 'var(--para)' }}>
                  {card.description}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* Right - Image + Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex flex-col gap-6 md:gap-8 order-1 md:order-2 mb-8 md:mb-0'
          >
            {/* Image */}
            <div className='relative w-full max-w-xs h-64 sm:h-80 md:w-84 md:h-84 rounded-lg overflow-hidden shadow-md mx-auto md:mx-0'>
              <img 
                src={heroImage} 
                alt='Get Involved' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </div>

            {/* Description Text */}
            <div>
              <p className='text-base sm:text-lg md:text-xl leading-relaxed font-medium' style={{ color: 'var(--para)' }}>
                Discover all the ways you can get involved with us: donations, partnerships, legacy giving, or volunteering. Together, we're using technology to transform child welfare in Rwanda—one child at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Get_involved
