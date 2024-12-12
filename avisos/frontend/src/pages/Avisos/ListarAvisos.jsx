import React, { useEffect, useState } from 'react';
import { getPublicAvisos, getAvisos, deleteAviso, reportAviso } from '../../services/avisos.service.js';
import AvisoTable from '../../components/AvisoTable';
import { useNavigate } from 'react-router-dom';
// Función auxiliar para verificar si el usuario está autenticado
const isAuthenticated = () => !!localStorage.getItem('token');

const ListarAvisos = () => {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const fetchAvisos = async () => {
    try {
      const data = isAuthenticated() ? await getAvisos() : '';
      setAvisos(data);
    } catch (error) {
      console.log('Error al cargar los avisos:', error);
    }
  };
  useEffect(() => {
    // Verifica si el usuario está autenticado
    setIsUserAuthenticated(isAuthenticated());

    // Carga los avisos según el estado de autenticación
    fetchAvisos();
  }, []);

  const handleDelete = async (id) => {
    if (!isUserAuthenticated) {
      alert('Debes iniciar sesión para realizar esta acción.');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas eliminar este aviso?')) {
      await deleteAviso(id);
      setAvisos(avisos.filter((aviso) => aviso.id !== id));
    }
  };

  const handleReport = async (id) => {
    if (!isUserAuthenticated) {
      alert('Debes iniciar sesión para reportar avisos.');
      return;
    }

    await reportAviso(id);
    alert('Aviso reportado.');
  };

  const handleLogin = () => {
    navigate('/auth')
  }

  return (
    <div>
      <h1>{isUserAuthenticated ? 'Mis Avisos' : 'Avisos Públicos'}</h1>
      <AvisoTable avisos={avisos} onDelete={handleDelete} onReport={handleReport} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default ListarAvisos;
