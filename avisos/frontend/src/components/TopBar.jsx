import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iuser from '../assets/user.png'; // Icono de usuario
import '../styles/TopBar.css';

const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="top-bar">
      <div className="user-section">
        <img src={iuser} alt="User Icon" className="user-icon" />
        {user ? (
          <>
            <span>Bienvenid@ {user.email}</span>
          </>
        ) : (
          <>
            <span>Bienvenid@ Invitado</span>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
