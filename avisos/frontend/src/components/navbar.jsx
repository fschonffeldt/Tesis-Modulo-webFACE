import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBarStyle.css';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('isSidebarCollapsed', JSON.stringify(newState));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const navbarStyle = {
    position: 'fixed',
    right: '0',
    top: '0',
    height: '100vh',
    width: '250px',
    zIndex: 20,
  };

  return (
    <div style={navbarStyle}>
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="logo-container" onClick={() => handleNavigation('/home')}>
          <img src={logo} alt="Logo" />
        </div>
        <button onClick={handleToggleSidebar}>
          {isCollapsed ? '🡸' : '🡺'}
        </button>
        <ul>
          <li onClick={() => handleNavigation('/home')}>
            <span>Home</span>
          </li>
          <li onClick={() => handleNavigation('/about')}>
            <span>About</span>
          </li>
          <li onClick={() => handleNavigation('/contact')}>
            <span>Contact</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
