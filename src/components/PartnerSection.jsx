import React from 'react'
import { motion } from 'motion/react'
import partnerImage1 from '../assets/1.jpeg'
import partnerImage2 from '../assets/2.jpeg'

const PartnerSection = ({ setActiveSection }) => {
  return (
    <div id='partner' style={{ backgroundColor: 'var(--white)' }}>
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
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-sm sm:text-base font-semibold mb-4' style={{ color: 'var(--para)' }}>
              Get involved
            </p>
            
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
              Your company can support people in need
            </h1>
            
            <p className='text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl' style={{ color: 'var(--para)' }}>
              Companies can also do something to help disadvantaged people, either when they have profit in a certain year or to mark anniversaries or special occasions.
            </p>

            {/* NEW: SRS Enhancement */}
            <p className='text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mt-6' style={{ color: 'var(--para)' }}>
              Through Compassionate Rwanda, our digital resource management platform, corporate partnerships 
              directly reduce waste by 30%, accelerate emergency response, and ensure vulnerable 
              children access healthcare, nutrition, and education with full transparency.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Partnership Options */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-lg sm:text-xl md:text-2xl leading-relaxed' style={{ color: 'var(--para)' }}>
              Would you like to express your social responsibility as a company and show solidarity with socially disadvantaged people in Rwanda and populations affected by crises and disasters around the world?
            </p>
            
            <p className='text-lg sm:text-xl md:text-2xl leading-relaxed mt-8' style={{ color: 'var(--para)' }}>
              Compassionate Rwanda offers you, your employees and your customers various ways 
              to support Compassionate Rwanda infrastructure and transform child welfare in Rwanda through 
              technology-enabled solutions:
            </p>
          </motion.div>
        </div>
      </div>

      {/* Partnership Options */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='space-y-16'>
            {/* Option 1: Company Donation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'
            >
              <div className='order-2 md:order-1'>
                <div className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'>
                  <img 
                    src={partnerImage1} 
                    alt='Company Donation' 
                    className='w-full h-full object-cover'
                    style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
                  />
                </div>
              </div>
              
              <div className='order-1 md:order-2'>
                <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                  Company donation
                </h2>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Your company can make a spontaneous financial contribution to Compassionate Rwanda's fund-raising campaigns for the victims of extreme weather events, earthquakes or armed conflicts, for example, or to mark a company anniversary, and help alleviate the hardship and suffering of those affected. We are also happy to accept donations for our Emergency Relief Fund, which enables us to respond quickly and effectively to crisis situations.
                </p>
                
                {/* NEW: SRS Enhancement */}
                <p className='text-base sm:text-lg leading-relaxed mt-6' style={{ color: 'var(--para)' }}>
                  Donations also fund Compassionate Rwanda platform development, data security infrastructure, 
                  and server maintenance—ensuring the system scales to reach more vulnerable children 
                  while maintaining Rwanda Data Protection Law compliance.
                </p>
              </div>
            </motion.div>

            {/* Option 2: Fundraising Campaign */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'
            >
              <div>
                <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                  Your own fundraising campaign
                </h2>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Your company wants to raise awareness and motivate employees to take action. 
                  Whether it is a cake sale, a charity run or a flea market, there are no limits 
                  to your creativity. Compassionate Rwanda will support you with a dedicated 
                  fundraising platform, materials, and real-time tracking through Compassionate Rwanda so your 
                  team can see the direct impact—how funds translate into resources registered 
                  in the system and delivered to children.
                </p>
              </div>
              
              <div className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'>
                <img 
                  src={partnerImage2} 
                  alt='Fundraising Campaign' 
                  className='w-full h-full object-cover'
                  style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
                />
              </div>
            </motion.div>

            {/* Option 3: Involve Customers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'
            >
              <div className='order-2 md:order-1'>
                <div className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'>
                  <img 
                    src={partnerImage1} 
                    alt='Involve Customers' 
                    className='w-full h-full object-cover'
                    style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
                  />
                </div>
              </div>
              
              <div className='order-1 md:order-2'>
                <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                  Involve your customers
                </h2>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Are you one of those companies that reward your loyal customers with a bonus system? Offer your customers the additional option of donating their bonus points to Compassionate Rwanda. Or organise sales promotions in which part of the purchase price is donated to Compassionate Rwanda. We provide you with texts and images for your communication channels.
                </p>
                
                {/* NEW: SRS Enhancement */}
                <p className='text-base sm:text-lg leading-relaxed mt-6' style={{ color: 'var(--para)' }}>
                  Every customer contribution is tracked in Compassionate Rwanda, creating transparent impact 
                  reports you can share with your customers—showing exactly how their generosity 
                  scaled child support services. This builds customer loyalty through measurable 
                  social impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-12' style={{ color: 'var(--navy-blue)' }}>
              The benefits of your involvement include:
            </h2>
            
            <div className='space-y-6'>
              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Corporate responsibility in practice
                </p>
              </div>
              
              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Employee and customer involvement
                </p>
              </div>
              
              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Company logo on Compassionate Rwanda dashboard for corporate donations of RWF 500,000 or more
                </p>
              </div>
              
              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Tax deductibility of donations to Compassionate Rwanda
                </p>
              </div>

              {/* NEW: SRS-Aligned Benefits */}
              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Real-time impact dashboard access showing resource allocation and outcomes via Compassionate Rwanda
                </p>
              </div>

              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Detailed reports proving 30% waste reduction and accelerated child support delivery
                </p>
              </div>

              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Partnership in scaling platform infrastructure to reach more vulnerable children
                </p>
              </div>

              <div className='flex gap-4'>
                <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                  Rwanda Data Protection Law compliant—secure, ethical partnership model
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='mt-12 px-10 py-4 rounded-full font-semibold text-white transition text-lg'
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Start a Partnership
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PartnerSection
