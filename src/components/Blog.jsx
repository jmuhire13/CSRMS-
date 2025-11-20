import React, { useState } from 'react'
import { motion } from 'motion/react'
import { blogPosts } from '../data/blogPosts'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === selectedCategory)

  return (
    <div id='blog' style={{ backgroundColor: 'var(--white)' }}>
      {/* Hero Section */}
      <div className='min-h-screen pt-32 px-4 pb-16 flex items-center' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className='text-sm sm:text-base font-medium mb-4' style={{ color: 'var(--para)' }}>
              Stay Updated
            </p>
            
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Blog
            </h1>
            
            <p className='text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto' style={{ color: 'var(--para)' }}>
              Discover stories of impact, technology updates, and ways to get involved in building a compassionate Rwanda.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Post */}
      <section className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold font-secondary mb-8' style={{ color: 'var(--navy-blue)' }}>
              Latest Story
            </h2>
            {blogPosts.length > 0 && (
              <div className='p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all' style={{ backgroundColor: 'var(--off-white)' }}>
                <span className='inline-block text-xs px-3 py-1 rounded-full font-semibold mb-4' style={{ backgroundColor: 'var(--navy-blue)', color: 'white' }}>
                  {blogPosts[0].category}
                </span>
                <h3 className='text-2xl sm:text-3xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
                  {blogPosts[0].title}
                </h3>
                <p className='text-base sm:text-lg mb-4 leading-relaxed' style={{ color: 'var(--para)' }}>
                  {blogPosts[0].excerpt}
                </p>
                <div className='flex items-center justify-between'>
                  <small style={{ color: 'var(--para)' }}>{blogPosts[0].date}</small>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-6 py-2 rounded-full font-semibold text-white transition-all'
                    style={{ backgroundColor: 'var(--navy-blue)' }}
                  >
                    Read More →
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className='px-4 py-8' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-5xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex flex-wrap gap-3 justify-center'
          >
            {['All', 'Technology', 'Impact Stories', 'Get Involved'].map(cat => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-6 py-2 rounded-full font-semibold transition-all'
                style={{
                  backgroundColor: selectedCategory === cat ? 'var(--navy-blue)' : 'var(--white)',
                  color: selectedCategory === cat ? 'white' : 'var(--navy-blue)',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className='px-4 py-16' style={{ backgroundColor: 'var(--white)' }}>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {filtered.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className='rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer'
                style={{ backgroundColor: 'var(--off-white)' }}
              >
                <div className='h-48 overflow-hidden'>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                  />
                </div>
                <div className='p-6'>
                  <span className='inline-block text-xs px-3 py-1 rounded-full font-semibold mb-3' style={{ backgroundColor: 'var(--navy-blue)', color: 'white' }}>
                    {post.category}
                  </span>
                  <h3 className='text-lg sm:text-xl font-bold font-secondary mb-2' style={{ color: 'var(--navy-blue)' }}>
                    {post.title}
                  </h3>
                  <p className='text-sm sm:text-base mb-4 leading-relaxed' style={{ color: 'var(--para)' }}>
                    {post.excerpt}
                  </p>
                  <small className='text-xs' style={{ color: 'var(--para)' }}>{post.date}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className='px-4 py-16' style={{ backgroundColor: 'var(--off-white)' }}>
        <div className='container mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className='text-3xl sm:text-4xl font-bold font-secondary mb-4' style={{ color: 'var(--navy-blue)' }}>
              Ready to Make an Impact?
            </h3>
            <p className='text-base sm:text-lg mb-8' style={{ color: 'var(--para)' }}>
              Join us in transforming child welfare in Rwanda
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-4 rounded-full font-semibold text-white transition-all shadow-lg hover:shadow-xl'
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              Get Involved Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog
