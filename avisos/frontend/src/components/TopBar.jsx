import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth.service';
import iuser from '../assets/user.png'; // Icono de usuario
import '../styles/TopBar.css';

const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/avisos-publicos');
  };

  const handleLogin = () => {
    navigate('/auth'); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="top-bar">
      <div className="user-section">
        <img src={iuser} alt="User Icon" className="user-icon" />
        {user ? (
          <>
            <span>Bienvenid@ {user.email}</span>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <span>Bienvenid@ Invitado</span>
            <button className="login-button" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
