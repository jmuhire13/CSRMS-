import React from 'react'
import { motion } from 'motion/react'
import teamImage1 from '../assets/1.jpeg'
import teamImage2 from '../assets/2.jpeg'

const GovernanceTeamSection = ({ setActiveSection }) => {
  return (
    <div id='governance-team' style={{ backgroundColor: 'var(--white)' }}>
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

      {/* Hero Section */}
      <div className='min-h-screen pt-8 px-4 pb-16 flex items-center' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-sm sm:text-base font-semibold mb-4' style={{ color: 'var(--para)' }}>
              About us
            </p>
            
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
              Governance and Team
            </h1>
            
            <p className='text-lg sm:text-xl md:text-2xl font-medium mb-8' style={{ color: 'var(--para)' }}>
              The people behind Compassionate Rwanda
            </p>
            
            <p className='text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl' style={{ color: 'var(--para)' }}>
              Meet the Rwanda-based team and international partners driving Compassionate Rwanda forward to transform 
              child welfare through technology, transparency, and compassion.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Strong Leadership Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg'
            >
              <img 
                src={teamImage1} 
                alt='Leadership Team' 
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
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Strong Leadership
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Our leadership team brings together decades of experience in child welfare, technology, 
                and humanitarian work. Based in Rwanda and compliant with Rwanda Data Protection Law, 
                they guide Compassionate Rwanda with a focus on protecting vulnerable children and ensuring transparency.
              </p>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                With expertise spanning social work, software development, education, and healthcare, 
                our leaders ensure the Compassionate Rwanda platform delivers measurable impact:
              </p>

              <ul className='space-y-3'>
                <li className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <span className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    30% reduction in resource waste
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <span className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Faster emergency response times
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <span className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    Increased child access to healthcare, nutrition, education
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Our Team Structure */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='order-2 md:order-1'
            >
              <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Compassionate Rwanda-Dedicated Professionals
              </h2>
              
              <p className='text-base sm:text-lg leading-relaxed mb-6' style={{ color: 'var(--para)' }}>
                Our specialized team ensures Compassionate Rwanda operates effectively, reaching vulnerable children 
                across Rwanda with transparency and measurable impact.
              </p>
              
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <div>
                    <p className='font-semibold text-base sm:text-lg' style={{ color: 'var(--navy-blue)' }}>
                      Field Officers & Social Workers
                    </p>
                    <p className='text-sm' style={{ color: 'var(--para)' }}>
                      Register vulnerable children, track healthcare, nutrition, education needs via 
                      Compassionate Rwanda mobile app. Ensure real-time data accuracy in the field.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <div>
                    <p className='font-semibold text-base sm:text-lg' style={{ color: 'var(--navy-blue)' }}>
                      Technology & Infrastructure Team
                    </p>
                    <p className='text-sm' style={{ color: 'var(--para)' }}>
                      Maintain real-time tracking system, mobile apps, donor dashboards, emergency 
                      alerts, cybersecurity, and Rwanda Data Protection Law compliance.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <div>
                    <p className='font-semibold text-base sm:text-lg' style={{ color: 'var(--navy-blue)' }}>
                      Data Analysts & Impact Team
                    </p>
                    <p className='text-sm' style={{ color: 'var(--para)' }}>
                      Measure 30% waste reduction, track emergency response improvements, monitor child 
                      access to services, and generate transparency reports for donors.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <div>
                    <p className='font-semibold text-base sm:text-lg' style={{ color: 'var(--navy-blue)' }}>
                      Partnership & Coordination Team
                    </p>
                    <p className='text-sm' style={{ color: 'var(--para)' }}>
                      Connect Compassionate Rwanda to NGOs, schools, clinics, and caregiver networks. Ensure seamless 
                      resource allocation and support delivery.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>✓</span>
                  <div>
                    <p className='font-semibold text-base sm:text-lg' style={{ color: 'var(--navy-blue)' }}>
                      Donor Relations & Accountability
                    </p>
                    <p className='text-sm' style={{ color: 'var(--para)' }}>
                      Provide real-time impact dashboards, transparent reporting, and proof that every 
                      donation reaches children efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg order-1 md:order-2'
            >
              <img 
                src={teamImage2} 
                alt='Our Team' 
                className='w-full h-full object-cover'
                style={{ filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: Our Partner Network */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-6 text-center' style={{ color: 'var(--navy-blue)' }}>
              Our Partner Ecosystem
            </h2>
            
            <p className='text-base sm:text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto' style={{ color: 'var(--para)' }}>
              Compassionate Rwanda connects a diverse ecosystem of organizations dedicated to child welfare in Rwanda. 
              Together, we identify needs, allocate resources efficiently, and deliver measurable impact.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
              {/* NGOs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='p-6 rounded-2xl text-center'
                style={{ backgroundColor: 'var(--off-white)' }}
              >
                <div className='text-5xl mb-4'>🏢</div>
                <h3 className='text-xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                  NGOs
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  Child welfare organizations identifying vulnerable children and delivering support
                </p>
              </motion.div>

              {/* Schools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='p-6 rounded-2xl text-center'
                style={{ backgroundColor: 'var(--off-white)' }}
              >
                <div className='text-5xl mb-4'>🏫</div>
                <h3 className='text-xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                  Schools
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  Education partners tracking student needs, enrollment, and learning outcomes
                </p>
              </motion.div>

              {/* Clinics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='p-6 rounded-2xl text-center'
                style={{ backgroundColor: 'var(--off-white)' }}
              >
                <div className='text-5xl mb-4'>🏥</div>
                <h3 className='text-xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                  Clinics & Healthcare
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  Healthcare providers delivering medical care and tracking child health outcomes
                </p>
              </motion.div>

              {/* Caregivers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='p-6 rounded-2xl text-center'
                style={{ backgroundColor: 'var(--off-white)' }}
              >
                <div className='text-5xl mb-4'>👨‍👩‍👧</div>
                <h3 className='text-xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                  Caregivers & Families
                </h3>
                <p className='text-sm' style={{ color: 'var(--para)' }}>
                  Guardians receiving support, guidance, and real-time updates on child progress
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 4: Governance Structure */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <h2 className='text-4xl sm:text-5xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Transparent Governance
            </h2>
            
            <p className='text-base sm:text-lg leading-relaxed mb-12' style={{ color: 'var(--para)' }}>
              Compassionate Rwanda operates under a strong governance framework ensuring accountability, 
              transparency, and ethical operation. We comply with Rwanda Data Protection Law and maintain 
              independent oversight of all activities.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='p-6 rounded-2xl'
                style={{ backgroundColor: 'var(--white)' }}
              >
                <div className='text-4xl mb-4 text-center'>⚖️</div>
                <h3 className='text-xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
                  Board of Directors
                </h3>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Experienced professionals providing strategic oversight, ensuring Compassionate Rwanda aligns with 
                  mission and meets highest standards
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='p-6 rounded-2xl'
                style={{ backgroundColor: 'var(--white)' }}
              >
                <div className='text-4xl mb-4 text-center'>📋</div>
                <h3 className='text-xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
                  Advisory Council
                </h3>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Experts in child welfare, technology, and social services guiding strategic decisions 
                  and platform development
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='p-6 rounded-2xl'
                style={{ backgroundColor: 'var(--white)' }}
              >
                <div className='text-4xl mb-4 text-center'>🔍</div>
                <h3 className='text-xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
                  Audit Committee
                </h3>
                <p className='text-sm sm:text-base' style={{ color: 'var(--para)' }}>
                  Ensuring financial transparency, legal compliance, and independent verification of 
                  impact metrics
                </p>
              </motion.div>
            </div>

            {/* Governance Commitments */}
            <div className='mb-12 text-left max-w-3xl mx-auto'>
              <h3 className='text-2xl font-bold font-secondary mb-6 text-center' style={{ color: 'var(--navy-blue)' }}>
                Our Governance Commitments
              </h3>
              
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    <strong>Rwanda Data Protection Law Compliance</strong>: Protecting child safety and 
                    donor privacy through secure Compassionate Rwanda infrastructure
                  </p>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    <strong>Transparent Donor Accountability</strong>: Real-time impact dashboards showing 
                    exactly where funds go and results achieved
                  </p>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    <strong>Regular Independent Audits</strong>: Annual financial and impact audits verify 
                    efficiency metrics (30% waste reduction, improved response times)
                  </p>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    <strong>Child Safety First</strong>: All Compassionate Rwanda operations prioritize protection of 
                    vulnerable children and ethical data handling
                  </p>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='text-2xl' style={{ color: 'var(--beige-accent)' }}>•</span>
                  <p className='text-base sm:text-lg' style={{ color: 'var(--para)' }}>
                    <strong>Measurable Impact Reporting</strong>: Quarterly reports on healthcare, nutrition, 
                    education access improvements for children
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setTimeout(() => setActiveSection('volunteer'), 300)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-10 py-4 rounded-full font-semibold text-white transition text-lg'
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              Join Our Team
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default GovernanceTeamSection
