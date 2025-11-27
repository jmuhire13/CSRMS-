import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa'

const contactImage = 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'

const ContactUs = ({ setActiveSection }) => {
  const [formData, setFormData] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    postcode: '',
    town: '',
    country: 'Rwanda',
    type: '',
    message: '',
    consent: false
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form to initial state
    setFormData({
      title: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      street: '',
      postcode: '',
      town: '',
      country: 'Rwanda',
      type: '',
      message: '',
      consent: false
    })
    alert('Thank you for contacting us! We will get back to you soon.')
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com', color: '#0077B5' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com', color: '#E4405F' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com', color: '#1877F2' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com', color: '#FF0000' }
  ]

  return (
    <div id='contact-us' style={{ backgroundColor: 'var(--off-white)' }}>
      <div className='min-h-screen pt-32 sm:pt-36 px-4 pb-12'>
        <div className='container mx-auto max-w-6xl'>
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-8 text-center'
          >
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
              Contact Us
            </h1>
            <p className='text-base sm:text-lg max-w-2xl mx-auto' style={{ color: 'var(--para)' }}>
              We're here to answer your questions and connect you with our mission
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
                src={contactImage} 
                alt='Contact Us' 
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
              
              <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold font-secondary mb-3'>
                  Let's Connect
                </h2>
                <p className='text-sm sm:text-base max-w-2xl leading-relaxed mb-4'>
                  Whether you have questions, want to partner with us, volunteer your time, or simply learn more 
                  about our mission to transform child welfare in Rwanda - we're here to help. Reach out and let's 
                  build a compassionate future together.
                </p>
                <div className='flex flex-wrap gap-3'>
                  <div className='flex items-center gap-2 text-sm'>
                    <FaEnvelope />
                    <span>info@compassionaterwanda.org</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <FaPhone />
                    <span>+250 788 000 000</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information Cards - 2x2 Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
            
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4'
              style={{ borderTopColor: 'var(--navy-blue)' }}
            >
              <div 
                className='w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'
                style={{ backgroundColor: 'var(--navy-blue)' }}
              >
                <FaMapMarkerAlt className='text-white text-xl' />
              </div>
              <div>
                <h3 className='text-base font-bold mb-1.5' style={{ color: 'var(--navy-blue)' }}>
                  Our Location
                </h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--para)' }}>
                  Kigali, Rwanda
                </p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4'
              style={{ borderTopColor: 'var(--navy-blue)' }}
            >
              <div 
                className='w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'
                style={{ backgroundColor: 'var(--navy-blue)' }}
              >
                <FaEnvelope className='text-white text-xl' />
              </div>
              <div>
                <h3 className='text-base font-bold mb-1.5' style={{ color: 'var(--navy-blue)' }}>
                  Email Us
                </h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--para)' }}>
                  info@compassionaterwanda.org
                </p>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4'
              style={{ borderTopColor: 'var(--navy-blue)' }}
            >
              <div 
                className='w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'
                style={{ backgroundColor: 'var(--navy-blue)' }}
              >
                <FaPhone className='text-white text-xl' />
              </div>
              <div>
                <h3 className='text-base font-bold mb-1.5' style={{ color: 'var(--navy-blue)' }}>
                  Call Us
                </h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--para)' }}>
                  +250 788 000 000
                </p>
              </div>
            </motion.div>

            {/* Social Media Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4'
              style={{ borderTopColor: 'var(--navy-blue)' }}
            >
              <h3 className='text-base font-bold mb-3' style={{ color: 'var(--navy-blue)' }}>
                Follow Us
              </h3>
              <div className='flex gap-3'>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-10 h-10 rounded-lg flex items-center justify-center text-white transition'
                    style={{ backgroundColor: social.color }}
                    aria-label={social.name}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form - Full Width Below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='max-w-3xl mx-auto'
          >
            <div className='bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4' style={{ borderTopColor: 'var(--navy-blue)' }}>
              <h2 className='text-xl sm:text-2xl font-bold font-secondary mb-5' style={{ color: 'var(--navy-blue)' }}>
                Send us a Message
              </h2>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  {/* Two Column Grid */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {/* Title Dropdown */}
                    <div>
                      <label htmlFor='title' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Title
                      </label>
                      <select
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)', color: 'var(--para)' }}
                      >
                        <option value=''>Title</option>
                        <option value='Mr'>Mr</option>
                        <option value='Ms'>Ms</option>
                        <option value='Mrs'>Mrs</option>
                        <option value='Dr'>Dr</option>
                      </select>
                    </div>

                    {/* Street */}
                    <div>
                      <label htmlFor='street' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Street, number
                      </label>
                      <input
                        type='text'
                        id='street'
                        name='street'
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder='Street, number'
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)' }}
                      />
                    </div>

                    {/* Firstname */}
                    <div>
                      <label htmlFor='firstname' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Firstname *
                      </label>
                      <input
                        type='text'
                        id='firstname'
                        name='firstname'
                        value={formData.firstname}
                        onChange={handleInputChange}
                        placeholder='Firstname'
                        required
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)' }}
                      />
                    </div>

                    {/* Post Code */}
                    <div>
                      <label htmlFor='postcode' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Post Code
                      </label>
                      <input
                        type='text'
                        id='postcode'
                        name='postcode'
                        value={formData.postcode}
                        onChange={handleInputChange}
                        placeholder='Post Code'
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)' }}
                      />
                    </div>

                    {/* Lastname */}
                    <div>
                      <label htmlFor='lastname' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Lastname *
                      </label>
                      <input
                        type='text'
                        id='lastname'
                        name='lastname'
                        value={formData.lastname}
                        onChange={handleInputChange}
                        placeholder='Lastname'
                        required
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)' }}
                      />
                    </div>

                    {/* Town */}
                    <div>
                      <label htmlFor='town' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Town
                      </label>
                      <input
                        type='text'
                        id='town'
                        name='town'
                        value={formData.town}
                        onChange={handleInputChange}
                        placeholder='Town'
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)' }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor='email' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Email *
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='your@email.com'
                        required
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)' }}
                      />
                    </div>

                    {/* Country Dropdown */}
                    <div>
                      <label htmlFor='country' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Country
                      </label>
                      <select
                        id='country'
                        name='country'
                        value={formData.country}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)', color: 'var(--para)' }}
                      >
                        <option value='Rwanda'>Rwanda</option>
                        <option value='Kenya'>Kenya</option>
                        <option value='Uganda'>Uganda</option>
                        <option value='Tanzania'>Tanzania</option>
                        <option value='Burundi'>Burundi</option>
                        <option value='Other'>Other</option>
                      </select>
                    </div>

                    {/* Phone - Full Width on Left Column */}
                    <div>
                      <label htmlFor='phone' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                        Phone
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Phone'
                        className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                        style={{ borderColor: 'var(--pale-blue)' }}
                      />
                    </div>
                  </div>

                  {/* Type Dropdown - Full Width */}
                  <div>
                    <label htmlFor='type' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                      Type
                    </label>
                    <select
                      id='type'
                      name='type'
                      value={formData.type}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition'
                      style={{ borderColor: 'var(--pale-blue)', color: 'var(--para)' }}
                    >
                      <option value=''>-- Type --</option>
                      <option value='General Inquiry'>General Inquiry</option>
                      <option value='Partnership'>Partnership</option>
                      <option value='Donation'>Donation</option>
                      <option value='Volunteer'>Volunteer</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  {/* Message - Full Width */}
                  <div>
                    <label htmlFor='message' className='block text-sm font-semibold mb-2' style={{ color: 'var(--navy-blue)' }}>
                      Message *
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder='Message'
                      required
                      rows='5'
                      className='w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition resize-none'
                      style={{ borderColor: 'var(--pale-blue)' }}
                    ></textarea>
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className='flex items-start gap-3'>
                    <input
                      type='checkbox'
                      id='consent'
                      name='consent'
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      required
                      className='mt-1 w-5 h-5 rounded border-2'
                      style={{ borderColor: 'var(--pale-blue)' }}
                    />
                    <label htmlFor='consent' className='text-sm' style={{ color: 'var(--para)' }}>
                      The information collected will only be used in connection with your request for information and will only be shared in accordance with our privacy policy. If you have any questions about the use of your personal data, you can consult our data protection policy.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type='submit'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='px-12 py-4 rounded-full font-bold text-white transition shadow-lg hover:shadow-xl uppercase'
                    style={{ backgroundColor: 'var(--navy-blue)' }}
                  >
                    SEND
                  </motion.button>
                </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Office Hours Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center'
          >
            <h2 className='text-3xl sm:text-4xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
              Office Hours
            </h2>
            <div className='bg-white rounded-3xl p-8 shadow-lg'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto'>
                <div className='flex justify-between items-center pb-3 border-b' style={{ borderColor: 'var(--pale-blue)' }}>
                  <span className='font-semibold' style={{ color: 'var(--navy-blue)' }}>Monday - Friday</span>
                  <span style={{ color: 'var(--para)' }}>8:00 AM - 5:00 PM</span>
                </div>
                <div className='flex justify-between items-center pb-3 border-b' style={{ borderColor: 'var(--pale-blue)' }}>
                  <span className='font-semibold' style={{ color: 'var(--navy-blue)' }}>Saturday</span>
                  <span style={{ color: 'var(--para)' }}>9:00 AM - 1:00 PM</span>
                </div>
                <div className='flex justify-between items-center pb-3 border-b' style={{ borderColor: 'var(--pale-blue)' }}>
                  <span className='font-semibold' style={{ color: 'var(--navy-blue)' }}>Sunday</span>
                  <span style={{ color: 'var(--para)' }}>Closed</span>
                </div>
                <div className='flex justify-between items-center pb-3 border-b' style={{ borderColor: 'var(--pale-blue)' }}>
                  <span className='font-semibold' style={{ color: 'var(--navy-blue)' }}>Public Holidays</span>
                  <span style={{ color: 'var(--para)' }}>Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
