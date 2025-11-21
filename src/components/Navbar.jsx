import React, { useState } from 'react'
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "motion/react"

const Navbar = ({ activeSection, setActiveSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleNavClick = (section) => {
        setActiveSection(section);
        setIsOpen(false);
    };
    
    const navLinks = (
        <ul className='font-medium flex flex-col md:flex-row md:items-center lg:space-x-8 md:space-x-6 space-y-4 md:space-y-0'> 
            <li>
                <motion.a
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    href="#get-involved" 
                    onClick={() => handleNavClick('get-involved')} 
                    className={`block md:inline-block transition-colors duration-200 ${
                        activeSection === 'get-involved' 
                            ? 'font-semibold' 
                            : 'hover:opacity-80'
                    }`}
                    style={{ color: 'var(--navy-blue)' }}>
                    Get Involved
                </motion.a>
            </li>
            <li>
                <motion.a
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    href="#our-work" 
                    onClick={() => handleNavClick('our-work')} 
                    className={`block md:inline-block transition-colors duration-200 ${
                        activeSection === 'our-work' 
                            ? 'font-semibold' 
                            : 'hover:opacity-80'
                    }`}
                    style={{ color: 'var(--navy-blue)' }}>
                    Our Work
                </motion.a>
            </li>
            <li>
                <motion.a
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    href="#about-us" 
                    onClick={() => handleNavClick('about-us')} 
                    className={`block md:inline-block transition-colors duration-200 ${
                        activeSection === 'about-us' 
                            ? 'font-semibold' 
                            : 'hover:opacity-80'
                    }`}
                    style={{ color: 'var(--navy-blue)' }}>
                    About Us
                </motion.a>
            </li>
            <li>
                <motion.a
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    href="#blog" 
                    onClick={() => handleNavClick('blog')} 
                    className={`block md:inline-block transition-colors duration-200 ${
                        activeSection === 'blog' 
                            ? 'font-semibold' 
                            : 'hover:opacity-80'
                    }`}
                    style={{ color: 'var(--navy-blue)' }}>
                    Blog
                </motion.a>
            </li>
            <li>
                <motion.a
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    href="#contact-us" 
                    onClick={() => handleNavClick('contact-us')} 
                    className={`block md:inline-block transition-colors duration-200 ${
                        activeSection === 'contact-us' 
                            ? 'font-semibold' 
                            : 'hover:opacity-80'
                    }`}
                    style={{ color: 'var(--navy-blue)' }}>
                    Contact Us
                </motion.a>
            </li>
        </ul>
    )
    
  return (
    <header className='fixed top-0 left-0 right-0 z-50 shadow-md' style={{ backgroundColor: '#E5E7EB' }}>
        <div className='container mx-auto px-6 md:px-8 lg:px-12 py-3 md:py-4'>
            <div className='flex justify-between items-center'>
                {/* Logo with name */}
                <motion.div 
                    className='flex items-center gap-3'
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <a href="/" className='flex items-center gap-3' onClick={() => handleNavClick('home')}>
                        <img src="/logo.svg" alt="logo" className='w-12 h-12 sm:w-14 sm:h-14' />
                        <div className='flex flex-col leading-tight'>
                            <span className='text-sm sm:text-base font-semibold font-secondary' style={{ color: 'var(--navy-blue)' }}>
                                Compassionate
                            </span>
                            <span className='text-sm sm:text-base font-semibold font-secondary' style={{ color: 'var(--navy-blue)' }}>
                                Rwanda
                            </span>
                        </div>
                    </a>
                </motion.div>

                {/* Nav items - Desktop */}
                <div className='hidden lg:flex items-center'>
                    <nav>
                        {navLinks}
                    </nav>
                </div>

                {/* Portal and Donate buttons - Desktop */}
                <div className='hidden lg:flex items-center gap-3'>
                    <motion.a 
                        href="#portal" 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='text-navy-blue px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg border-2 bg-white'
                        style={{ 
                            color: 'var(--navy-blue)',
                            borderColor: 'var(--navy-blue)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--navy-blue)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'var(--navy-blue)';
                        }}
                    >
                        Access Portal
                    </motion.a>
                    <motion.a 
                        href="#donate" 
                        onClick={() => handleNavClick('donate')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg border-2 hover:bg-white group'
                        style={{ 
                            backgroundColor: 'var(--navy-blue)',
                            borderColor: 'var(--navy-blue)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'var(--navy-blue)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--navy-blue)';
                            e.currentTarget.style.color = 'white';
                        }}
                    >
                        Donate
                    </motion.a>
                </div>

                {/* Hamburger menu icon */}
                <div className='flex lg:hidden'>
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9 }}
                        className='focus:outline-none p-2 rounded-lg transition-colors duration-200'
                        style={{ color: 'var(--navy-blue)' }}
                        aria-label='Toggle menu'
                    >
                        {isOpen ? (
                            <HiX className='w-7 h-7'/>
                        ) : (
                            <HiMenuAlt3 className='w-7 h-7'/>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className='lg:hidden overflow-hidden border-t border-gray-300'
                    style={{ backgroundColor: '#E5E7EB' }}
                >
                    <div className='container mx-auto px-6 md:px-8 py-6'>
                        <nav className='mb-6'>
                            {navLinks}
                        </nav>
                        <div className='space-y-3'>
                            <motion.a 
                                href="#portal" 
                                whileTap={{ scale: 0.95 }}
                                className='block text-center text-navy-blue px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2 bg-white'
                                style={{ 
                                    color: 'var(--navy-blue)',
                                    borderColor: 'var(--navy-blue)'
                                }}
                                onTouchStart={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--navy-blue)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onTouchEnd={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.color = 'var(--navy-blue)';
                                }}
                            >
                                Access Portal
                            </motion.a>
                            <motion.a 
                                href="#donate" 
                                onClick={() => handleNavClick('donate')}
                                whileTap={{ scale: 0.95 }}
                                className='block text-center text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2'
                                style={{ 
                                    backgroundColor: 'var(--navy-blue)',
                                    borderColor: 'var(--navy-blue)'
                                }}
                            onTouchStart={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.color = 'var(--navy-blue)';
                            }}
                            onTouchEnd={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--navy-blue)';
                                e.currentTarget.style.color = 'white';
                            }}
                        >
                            Donate
                        </motion.a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </header>
  )
}

export default Navbar
