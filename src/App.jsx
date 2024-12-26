import './App.css'
import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  {Footer}  from './components/Footer';
import  {Home} from './pages/Home';
import { Sidebar } from './components/SideBar';
import { HiMenu, HiChevronLeft } from 'react-icons/hi';
import { MdNightsStay, MdWbSunny } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Co2 } from './pages/Co2';
import { Temperature } from './pages/Temperature';
import { No2 } from './pages/No2';
import { Methane } from './pages/Methane';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768 ? true : false);
  
  const handleSidebarSelect = () => {
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  const ToggleButton = ({ onClick, activeIcon, inactiveIcon, isActive }) => (
    <button onClick={onClick} className='duration-300'>
      {isActive ? activeIcon : inactiveIcon}
    </button>
  );




  ToggleButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    activeIcon: PropTypes.element.isRequired,
    inactiveIcon: PropTypes.element.isRequired,
    isActive: PropTypes.bool.isRequired
  };


  return (
    <Router>
      <div className={`flex flex-col overflow-x-hidden ${darkMode ? 'dark' : ''}`}>

        <div className='flex dark:bg-slate-800 dark:text-white'>

        <div className={`flex transition-all duration-300 ${showSidebar ? 'w-72' : 'w-0'}`}>
            <Sidebar onSelect={handleSidebarSelect} />
          </div>

          <div className="flex-grow">
            <div className="flex justify-between p-4">
              <div className="flex">
                <ToggleButton
                  onClick={() => setShowSidebar(!showSidebar)}
                  activeIcon={<HiChevronLeft size={24} className='mr-2 hover:text-sky-600' />}
                  inactiveIcon={<HiMenu size={24} className='mr-2 hover:text-sky-600' />}
                  isActive={showSidebar}
                />
                <ToggleButton
                  onClick={() => setDarkMode(!darkMode)}
                  activeIcon={<MdWbSunny size={24} className='hover:text-yellow-500' />}
                  inactiveIcon={<MdNightsStay size={24} className='hover:text-blue-800' />}
                  isActive={darkMode}
                />
              </div>
            </div>



        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/co2" element={<Co2 />} />
          <Route path="/no2" element={<No2 />} />
          <Route path="/methane" element={<Methane />} />


        </Routes>
      <Footer />

      </div>
      </div>
    </div>
    </Router>
  );
}

export default App
