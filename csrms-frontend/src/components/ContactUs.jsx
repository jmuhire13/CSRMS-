import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa'
import contactImage from '../assets/1.jpeg'

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
    <div id='contact-us' style={{ backgroundColor: 'var(--white)' }}>
      {/* Hero Section */}
      <div className='pt-24 sm:pt-28 px-4 pb-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Contact us
              </h1>
              
              <p className='text-base sm:text-lg md:text-xl leading-relaxed' style={{ color: 'var(--para)' }}>
                If you have any questions or would like to find out more about our foundation, please do not hesitate to contact us. We look forward to hearing from you.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='order-first lg:order-last'
            >
              <img 
                src={contactImage} 
                alt='Team Meeting' 
                className='w-full h-auto rounded-3xl shadow-2xl object-cover'
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Contact Information & Form Section */}
      <div className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            
            {/* Left - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className='text-3xl sm:text-4xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
                Let's Connect
              </h2>
              
              <p className='text-lg mb-8 leading-relaxed' style={{ color: 'var(--para)' }}>
                Whether you're interested in partnering with us, volunteering, or simply learning more about our mission, we're here to help.
              </p>

              {/* Contact Details */}
              <div className='space-y-6 mb-8'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-full flex items-center justify-center shrink-0' style={{ backgroundColor: 'var(--navy-blue)' }}>
                    <FaMapMarkerAlt className='text-white text-xl' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg mb-1' style={{ color: 'var(--navy-blue)' }}>
                      Our Location
                    </h3>
                    <p style={{ color: 'var(--para)' }}>
                      Kigali, Rwanda
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-full flex items-center justify-center shrink-0' style={{ backgroundColor: 'var(--navy-blue)' }}>
                    <FaEnvelope className='text-white text-xl' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg mb-1' style={{ color: 'var(--navy-blue)' }}>
                      Email Us
                    </h3>
                    <p style={{ color: 'var(--para)' }}>
                      info@compassionaterwanda.org
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-full flex items-center justify-center shrink-0' style={{ backgroundColor: 'var(--navy-blue)' }}>
                    <FaPhone className='text-white text-xl' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg mb-1' style={{ color: 'var(--navy-blue)' }}>
                      Call Us
                    </h3>
                    <p style={{ color: 'var(--para)' }}>
                      +250 788 000 000
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className='font-semibold text-lg mb-4' style={{ color: 'var(--navy-blue)' }}>
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
                      className='w-12 h-12 rounded-full flex items-center justify-center text-white transition'
                      style={{ backgroundColor: social.color }}
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className='bg-white rounded-3xl p-8 shadow-2xl' style={{ border: '1px solid var(--pale-blue)' }}>
                <h2 className='text-2xl sm:text-3xl font-bold font-secondary mb-6' style={{ color: 'var(--navy-blue)' }}>
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
