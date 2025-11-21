import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = ({ setActiveSection }) => {
  const [activeAccordion, setActiveAccordion] = useState(null)

  const handleNavigation = (sectionId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActiveSection(sectionId), 300)
  }

  const faqs = [
    {
      question: 'What is Compassionate Rwanda?',
      answer: 'Compassionate Rwanda is a digital platform connecting NGOs, schools, and caregivers to track and deliver resources to vulnerable children across Rwanda, ensuring transparency and maximizing impact.'
    },
    {
      question: 'How can I donate?',
      answer: 'You can donate through our secure online platform by visiting the Donate page. We accept credit cards, PayPal, mobile money, and bank transfers. All donations are tracked in real-time for complete transparency.'
    },
    {
      question: 'Where does my donation go?',
      answer: '85% of donations directly support vulnerable children through healthcare, nutrition, and education. 15% maintains the Compassionate Rwanda platform infrastructure and operational costs. You can track your donation impact in real-time.'
    },
    {
      question: 'Can I volunteer?',
      answer: 'Yes! We welcome volunteers including software developers, social workers, field officers, data analysts, and community advocates. Visit our Volunteer page to learn more and sign up.'
    },
    {
      question: 'How does the platform reduce waste?',
      answer: 'Through real-time tracking and intelligent resource allocation, Compassionate Rwanda reduces resource waste by 30%, ensuring no duplication and that resources reach those who need them most.'
    },
    {
      question: 'Can my company partner with you?',
      answer: 'Absolutely! We offer various partnership options including direct donations, fundraising campaigns, and customer involvement programs. Visit our Partner page to explore opportunities.'
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com', color: '#0077B5' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com', color: '#E4405F' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com', color: '#1877F2' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com', color: '#FF0000' }
  ]

  return (
    <footer style={{ backgroundColor: 'var(--navy-blue)' }}>
      {/* FAQs Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold font-secondary mb-8 text-center' style={{ color: 'var(--navy-blue)' }}>
              Frequently Asked Questions
            </h2>

            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='rounded-2xl overflow-hidden'
                  style={{ backgroundColor: 'var(--off-white)' }}
                >
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                    className='w-full px-6 py-4 text-left flex justify-between items-center hover:bg-opacity-80 transition'
                  >
                    <span className='text-lg font-semibold' style={{ color: 'var(--navy-blue)' }}>
                      {faq.question}
                    </span>
                    <span className='text-2xl' style={{ color: 'var(--navy-blue)' }}>
                      {activeAccordion === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  {activeAccordion === index && (
                    <div className='px-6 pb-4'>
                      <p className='leading-relaxed' style={{ color: 'var(--para)' }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className='px-4 py-12' style={{ backgroundColor: 'var(--navy-blue)' }}>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
            
            {/* About Column */}
            <div>
              <h3 className='text-xl font-bold font-secondary mb-4 text-white'>
                About Us
              </h3>
              <p className='text-white/80 mb-4 text-sm leading-relaxed'>
                Building a compassionate Rwanda, one child at a time through technology, transparency, and collaboration.
              </p>
              <div className='space-y-2 text-sm'>
                <div className='flex items-start gap-2 text-white/80'>
                  <FaMapMarkerAlt className='mt-1 shrink-0' />
                  <span>Kigali, Rwanda</span>
                </div>
                <div className='flex items-center gap-2 text-white/80'>
                  <FaEnvelope />
                  <span>info@compassionaterwanda.org</span>
                </div>
                <div className='flex items-center gap-2 text-white/80'>
                  <FaPhone />
                  <span>+250 788 000 000</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='text-xl font-bold font-secondary mb-4 text-white'>
                Quick Links
              </h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <button onClick={() => handleNavigation('home')} className='text-white/80 hover:text-white transition'>
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('about-us')} className='text-white/80 hover:text-white transition'>
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('our-work')} className='text-white/80 hover:text-white transition'>
                    Our Work
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('blog')} className='text-white/80 hover:text-white transition'>
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h3 className='text-xl font-bold font-secondary mb-4 text-white'>
                Get Involved
              </h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <button onClick={() => handleNavigation('donate')} className='text-white/80 hover:text-white transition'>
                    Donate
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('volunteer')} className='text-white/80 hover:text-white transition'>
                    Volunteer
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('partner')} className='text-white/80 hover:text-white transition'>
                    Partner With Us
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('legacy')} className='text-white/80 hover:text-white transition'>
                    Legacy Giving
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className='text-xl font-bold font-secondary mb-4 text-white'>
                Follow Us
              </h3>
              <p className='text-white/80 mb-4 text-sm'>
                Stay connected with our latest updates and stories
              </p>
              <div className='flex gap-3'>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-10 h-10 rounded-full flex items-center justify-center text-white transition'
                    style={{ backgroundColor: social.color }}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-white/20 pt-8 mt-8'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80'>
              <p>
                © {new Date().getFullYear()} Compassionate Rwanda. All rights reserved.
              </p>
              <div className='flex gap-6'>
                <button className='hover:text-white transition'>
                  Privacy Policy
                </button>
                <button className='hover:text-white transition'>
                  Terms of Service
                </button>
                <button className='hover:text-white transition'>
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
