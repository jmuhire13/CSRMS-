import React from 'react'
import { motion } from 'motion/react'
import missionImage1 from '../assets/1.jpeg'
import missionImage2 from '../assets/2.jpeg'

const OurMissionSection = ({ setActiveSection }) => {
  return (
    <div id='our-mission' style={{ backgroundColor: 'var(--white)' }}>
      {/* Back Button */}
      <div className='px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-4'>
        <motion.button
          onClick={() => setActiveSection('about-us')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='px-6 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-xl'
          style={{ backgroundColor: 'var(--navy-blue)' }}
        >
          ← Back
        </motion.button>
      </div>

      {/* Mission and Mandate Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className='text-sm sm:text-base font-medium mb-4' style={{ color: 'var(--para)' }}>
                About us
              </p>
              
              <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
                Mission and mandate
              </h1>
              
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                In partnership with schools, NGOs, and communities across Rwanda, Compassionate Rwanda has been a key player in promoting child welfare and ensuring vulnerable children access essential resources for over 5 years through the Compassionate Rwanda platform.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'
            >
              <img 
                src={missionImage1} 
                alt='Mission and Mandate' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Our Vision */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Our vision
            </h2>
            
            <p className='text-base sm:text-lg leading-relaxed mb-8' style={{ color: 'var(--para)' }}>
              Compassionate Rwanda is the benchmark organization for leveraging technology to help those most affected by adversity in Rwanda and by humanitarian crises around the region.
            </p>
            
            <p className='text-base sm:text-lg leading-relaxed mb-8' style={{ color: 'var(--para)' }}>
              Through its Compassionate Rwanda platform connecting vulnerable children with resources, Compassionate Rwanda supports local and national projects carried out by partner NGOs and schools.
            </p>
            
            <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
              The organization's commitment is founded on strong values such as compassion, transparency and excellence, while ensuring that the resources provided are managed transparently and achieve a lasting impact.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 3: Our Mission */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--navy-blue)' }}>
        <div className='container mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold font-secondary mb-8 text-white'>
              Our mission
            </h2>
            
            <p className='text-base sm:text-lg leading-relaxed text-white/90'>
              Compassionate Rwanda is a responsible platform. The organization ensures that the resources tracked and distributed through Compassionate Rwanda are invested in high-quality humanitarian and social projects to address the needs of vulnerable children affected by poverty, lack of healthcare, inadequate education, and other challenges across Rwanda.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 4: Our Values */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold font-secondary mb-12 text-center' style={{ color: 'var(--navy-blue)' }}>
              Our values
            </h2>
            
            <div className='space-y-8'>
              {/* Solidarity */}
              <div>
                <h3 className='text-2xl font-bold mb-4' style={{ color: 'var(--navy-blue)' }}>• Solidarity</h3>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Compassionate Rwanda is dedicated to expressing solidarity with vulnerable children and communities facing challenges both locally and nationally through the Compassionate Rwanda platform.
                </p>
              </div>

              {/* Partnerships */}
              <div>
                <h3 className='text-2xl font-bold mb-4' style={{ color: 'var(--navy-blue)' }}>• Partnerships</h3>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Compassionate Rwanda was created as a partnership platform connecting schools, NGOs, and caregivers. The Compassionate Rwanda system is tasked with tracking resources and, in collaboration with implementing partners (NGOs, schools, communities, etc.), ensuring vulnerable children receive the support they need. Together, these partners work in the interests of child welfare, with the shared goal of fulfilling the mission.
                </p>
              </div>

              {/* Transparency */}
              <div>
                <h3 className='text-2xl font-bold mb-4' style={{ color: 'var(--navy-blue)' }}>• Transparency</h3>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Through real-time tracking and data visibility, Compassionate Rwanda ensures complete transparency in how resources reach vulnerable children, building trust with all stakeholders.
                </p>
              </div>

              {/* Independence */}
              <div>
                <h3 className='text-2xl font-bold mb-4' style={{ color: 'var(--navy-blue)' }}>• Independence</h3>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  Operating with autonomy and integrity, Compassionate Rwanda maintains independence in decision-making to best serve the interests of vulnerable children.
                </p>
              </div>

              {/* Efficiency */}
              <div>
                <h3 className='text-2xl font-bold mb-4' style={{ color: 'var(--navy-blue)' }}>• Efficiency</h3>
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                  The Compassionate Rwanda platform reduces resource waste by 30% through intelligent allocation, ensuring every contribution has maximum impact on vulnerable children's lives.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 5: Management Principles */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'
            >
              <img 
                src={missionImage2} 
                alt='Management Principles' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
                Management principles of Compassionate Rwanda
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed' style={{ color: 'var(--para)' }}>
                Relying on its partners for the development of its activities, Compassionate Rwanda ensures quality control, transparency in resource tracking, and accountability at every level of operation through the Compassionate Rwanda platform.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurMissionSection
