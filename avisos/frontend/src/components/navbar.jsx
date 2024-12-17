import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el AuthContext
import '../styles/NavBarStyle.css';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Accede al estado de autenticación y logout

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
    left: '0',
    top: '0',
    height: '100vh',
    width: '250px',
    zIndex: 20,
  };

  // Si el usuario no está autenticado, no renderiza la Navbar
  if (!isAuthenticated) return null;

  return (
    <div style={navbarStyle}>
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="logo-container" onClick={() => handleNavigation('/listar-avisos')}>
          <img src={logo} alt="Logo" />
        </div>
        <button onClick={handleToggleSidebar}>
          {isCollapsed ? '🡸' : '🡺'}
        </button>
        <ul>
          <li onClick={() => handleNavigation('/listar-avisos')}>
            <span>Avisos</span>
          </li>
          <li onClick={() => handleNavigation('/mis-avisos')}>
            <span>Mis Avisos</span>
          </li>
          <li onClick={() => handleNavigation('/crear-aviso')}>
            <span>Crear Aviso</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
