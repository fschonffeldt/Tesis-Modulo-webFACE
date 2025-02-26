import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth.service'; // Importamos el logout desde auth.service
import '../styles/NavBarStyle.css';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // NO extraemos logout de aquí

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    try {
      await logout(); // Usamos el mismo método que en TopBar.jsx
      localStorage.clear(); // Borra datos de sesión
      navigate('/avisos-publicos'); // Redirige
      window.location.reload(); // Fuerza la actualización de la vista
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo-container" onClick={() => navigate('/listar-avisos')}>
        <img src={logo} alt="Logo" />
      </div>

      <ul className="sidebar-menu">
        {!isAuthenticated ? (
          <li onClick={handleLogin} className="auth-button">
            <span>Iniciar Sesión</span>
          </li>
        ) : (
          <>
            <li onClick={() => navigate('/listar-avisos')}>
              <span>Avisos</span>
            </li>
            <li onClick={() => navigate('/mis-avisos')}>
              <span>Mis Avisos</span>
            </li>
            <li onClick={() => navigate('/crear-aviso')}>
              <span>Crear Aviso</span>
            </li>
            <li onClick={() => navigate('/avisos-reportados')}>
              <span>Reportes</span>
            </li>
          </>
        )}
      </ul>

      {isAuthenticated && (
        <div className="logout-container">
          <li onClick={handleLogout} className="logout-button">
            <span>Cerrar Sesión</span>
          </li>
        </div>
      )}
    </div>
  );
};

export default Navbar;
