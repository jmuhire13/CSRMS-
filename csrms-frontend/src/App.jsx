import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GetInvolved from './components/Get_involved'
import DonateSection from './components/DonateSection'
import PartnerSection from './components/PartnerSection'
import LegacySection from './components/LegacySection'
import VolunteerSection from './components/VolunteerSection'
import OurWork from './components/Work'
import HowWeOperateSection from './components/HowWeOperateSection'
import AboutUs from './components/About'
import OurMissionSection from './components/OurMissionSection'
import GovernanceTeamSection from './components/GovernanceTeamSection'
import Blog from './components/Blog'
import Footer from './components/Footer'
import HomeContent from './components/HomeContent'
import ContactUs from './components/ContactUs'  
import Portal from './Portal'

// Website layout component
const WebsiteLayout = ({ activeSection, setActiveSection }) => (
  <div className='font-primary overflow-x-hidden'>
    <Navbar activeSection={activeSection} setActiveSection={setActiveSection}/>
    
    {activeSection === 'home' && (
      <>
        <Hero/>
        <HomeContent setActiveSection={setActiveSection}/>
      </>
    )}
    {activeSection === 'get-involved' && <GetInvolved setActiveSection={setActiveSection}/>}
    {activeSection === 'donate' && <DonateSection setActiveSection={setActiveSection}/>}
    {activeSection === 'partner' && <PartnerSection setActiveSection={setActiveSection}/>}
    {activeSection === 'legacy' && <LegacySection setActiveSection={setActiveSection}/>}
    {activeSection === 'volunteer' && <VolunteerSection setActiveSection={setActiveSection}/>}
    {activeSection === 'our-work' && <OurWork setActiveSection={setActiveSection}/>}
    {activeSection === 'how-we-operate' && <HowWeOperateSection setActiveSection={setActiveSection}/>}
    {activeSection === 'about-us' && <AboutUs setActiveSection={setActiveSection}/>}
    {activeSection === 'our-mission' && <OurMissionSection setActiveSection={setActiveSection}/>}
    {activeSection === 'governance-team' && <GovernanceTeamSection setActiveSection={setActiveSection}/>}
    {activeSection === 'blog' && <Blog/>}
    {activeSection === 'contact-us' && <ContactUs setActiveSection={setActiveSection}/>}
    
    <Footer setActiveSection={setActiveSection}/>
  </div>
)

function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <Router>
      <Routes>
        {/* Portal routes */}
        <Route path="/portal/*" element={<Portal />} />
        
        {/* Main website route */}
        <Route path="/*" element={<WebsiteLayout activeSection={activeSection} setActiveSection={setActiveSection} />} />
      </Routes>
    </Router>
  )
}

export default App