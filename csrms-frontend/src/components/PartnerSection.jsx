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
      <div className='pt-16 px-4 pb-12' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-xs sm:text-sm font-semibold mb-3' style={{ color: 'var(--para)' }}>
              Get involved
            </p>
            
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
              Your Company Can Support People in Need
            </h1>
            
            <p className='text-sm sm:text-base leading-relaxed max-w-3xl' style={{ color: 'var(--para)' }}>
              Companies can do something to help disadvantaged people, marking anniversaries or special occasions through meaningful partnerships.
            </p>

            <p className='text-sm sm:text-base leading-relaxed max-w-3xl mt-4' style={{ color: 'var(--para)' }}>
              Through Compassionate Rwanda, corporate partnerships directly reduce waste by 30%, accelerate emergency response, and ensure vulnerable 
              children access healthcare, nutrition, and education with full transparency.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Partnership Options */}
      <div className='px-4 py-10' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-sm sm:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
              Would you like to express your social responsibility as a company and show solidarity with socially disadvantaged people in Rwanda?
            </p>
            
            <p className='text-sm sm:text-base leading-relaxed mt-4' style={{ color: 'var(--para)' }}>
              Compassionate Rwanda offers various ways to support our infrastructure and transform child welfare through technology-enabled solutions:
            </p>
          </motion.div>
        </div>
      </div>

      {/* Partnership Options */}
      <div className='px-4 py-12' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='space-y-12'>
            {/* Option 1: Company Donation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center'
            >
              <div className='order-2 md:order-1'>
                <div className='relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg'>
                  <img 
                    src={partnerImage1} 
                    alt='Company Donation' 
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
              
              <div className='order-1 md:order-2'>
                <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
                  Company Donation
                </h2>
                <p className='text-sm sm:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
                  Your company can make a financial contribution to Compassionate Rwanda's campaigns for victims of crises, mark company anniversaries, or support our Emergency Relief Fund for quick and effective responses.
                </p>
                
                <p className='text-sm sm:text-base leading-relaxed mt-4' style={{ color: 'var(--para)' }}>
                  Donations fund platform development, data security infrastructure, and server maintenance—ensuring the system scales to reach more vulnerable children while maintaining Rwanda Data Protection Law compliance.
                </p>
              </div>
            </motion.div>

            {/* Option 2: Fundraising Campaign */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center'
            >
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
                  Your Own Fundraising Campaign
                </h2>
                <p className='text-sm sm:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
                  Raise awareness and motivate employees with creative campaigns—cake sales, charity runs, or flea markets. Compassionate Rwanda supports you with a dedicated fundraising platform and real-time tracking, so your team sees direct impact.
                </p>
              </div>
              
              <div className='relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg'>
                <img 
                  src={partnerImage2} 
                  alt='Fundraising Campaign' 
                  className='w-full h-full object-cover'
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
                <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
                  Involve Your Customers
                </h2>
                <p className='text-sm sm:text-base leading-relaxed' style={{ color: 'var(--para)' }}>
                  Are you one of those companies that reward your loyal customers with a bonus system? Offer your customers the additional option of donating their bonus points to Compassionate Rwanda. Or organise sales promotions in which part of the purchase price is donated to Compassionate Rwanda. We provide you with texts and images for your communication channels.
                </p>
                
                {/* NEW: SRS Enhancement */}
                <p className='text-sm sm:text-base leading-relaxed mt-4' style={{ color: 'var(--para)' }}>
                  Every customer contribution is tracked in Compassionate Rwanda, creating transparent impact reports you can share with your customers—showing exactly how their generosity scaled child support services. This builds customer loyalty through measurable social impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className='px-4 py-12' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
              The Benefits of Your Involvement Include:
            </h2>
            
            <div className='space-y-4'>
              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Corporate responsibility in practice
                </p>
              </div>
              
              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Employee and customer involvement
                </p>
              </div>
              
              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Company logo on Compassionate Rwanda dashboard for corporate donations of RWF 500,000 or more
                </p>
              </div>
              
              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Tax deductibility of donations to Compassionate Rwanda
                </p>
              </div>

              {/* NEW: SRS-Aligned Benefits */}
              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Real-time impact dashboard access showing resource allocation and outcomes via Compassionate Rwanda
                </p>
              </div>

              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Detailed reports proving 30% waste reduction and accelerated child support delivery
                </p>
              </div>

              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Partnership in scaling platform infrastructure to reach more vulnerable children
                </p>
              </div>

              <div className='flex gap-3'>
                <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Rwanda Data Protection Law compliant—secure, ethical partnership model
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PartnerSection
