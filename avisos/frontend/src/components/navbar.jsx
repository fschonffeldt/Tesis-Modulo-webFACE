import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth.service'; // Importamos el logout desde auth.service
import '../styles/NavBarStyle.css';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth(); // Ahora obtenemos el rol del usuario

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    try {
      await logout(); 
      localStorage.clear(); 
      navigate('/avisos-publicos'); 
      window.location.reload();
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

            {/* 📌 Mostrar Reportes solo si el usuario es Admin o Moderador */}
            {(userRole === 'admin' || userRole === 'moderador') && (
              <>
                <li onClick={() => navigate('/avisos-reportados')}>
                  <span>Reportes</span>
                </li>
                <li onClick={() => navigate('/estadisticas')}>
                  <span>Estadísticas</span>
                </li>
              </>
            )}
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
