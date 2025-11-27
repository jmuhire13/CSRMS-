import React, { useState } from 'react'
import { motion } from 'motion/react'
import { blogPosts } from '../data/blogPosts'

const blogHeroImage = 'https://images.pexels.com/photos/30483241/pexels-photo-30483241.jpeg'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === selectedCategory)

  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null

  return (
    <div id='blog' style={{ backgroundColor: 'var(--off-white)' }}>
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
              Our Blog
            </h1>
            <p className='text-base sm:text-lg max-w-2xl mx-auto' style={{ color: 'var(--para)' }}>
              Stories of impact, technology updates, and ways to get involved
            </p>
          </motion.div>

          {/* Featured Post with Hero Style */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative mb-10 rounded-2xl overflow-hidden shadow-xl'
            >
              <div className='relative h-[350px] sm:h-[400px] md:h-[450px]'>
                <img 
                  src={blogHeroImage} 
                  alt={featuredPost.title} 
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
                
                <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white'>
                  <span className='inline-block text-xs px-3 py-1 rounded-full font-semibold mb-3' style={{ backgroundColor: 'var(--navy-blue)' }}>
                    {featuredPost.category}
                  </span>
                  <h2 className='text-xl sm:text-2xl md:text-3xl font-bold font-secondary mb-3'>
                    {featuredPost.title}
                  </h2>
                  <p className='text-sm sm:text-base max-w-2xl leading-relaxed mb-4'>
                    {featuredPost.excerpt}
                  </p>
                  <div className='flex items-center gap-4 flex-wrap'>
                    <small className='text-white/80'>{featuredPost.date}</small>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='px-6 py-2.5 bg-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300'
                      style={{ color: 'var(--navy-blue)' }}
                    >
                      Read Full Story →
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-wrap gap-3 justify-center mb-8'
          >
            {['All', 'Technology', 'Impact Stories', 'Get Involved'].map(cat => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-6 py-2 rounded-lg font-semibold transition-all shadow-sm'
                style={{
                  backgroundColor: selectedCategory === cat ? 'var(--navy-blue)' : 'white',
                  color: selectedCategory === cat ? 'white' : 'var(--navy-blue)',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
            {filtered.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className='bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-t-4'
                style={{ borderTopColor: 'var(--navy-blue)' }}
              >
                <div>
                  <span className='inline-block text-xs px-3 py-1 rounded-full font-semibold mb-3' style={{ backgroundColor: 'var(--navy-blue)', color: 'white' }}>
                    {post.category}
                  </span>
                  <h3 className='text-base font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                    {post.title}
                  </h3>
                  <p className='text-sm mb-3 leading-relaxed' style={{ color: 'var(--para)' }}>
                    {post.excerpt}
                  </p>
                  <small className='text-xs' style={{ color: 'var(--para)' }}>{post.date}</small>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4'
            style={{ borderTopColor: 'var(--navy-blue)' }}
          >
            <h3 className='text-xl sm:text-2xl font-bold font-secondary mb-3' style={{ color: 'var(--navy-blue)' }}>
              Ready to Make an Impact?
            </h3>
            <p className='text-sm sm:text-base max-w-2xl mx-auto mb-5' style={{ color: 'var(--para)' }}>
              Join us in transforming child welfare in Rwanda through technology, transparency, and compassionate action.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md'
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              Get Involved Today
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Blog
