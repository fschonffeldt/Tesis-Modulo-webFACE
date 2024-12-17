import React, { useEffect, useState } from 'react';
import { getAvisos, reportAviso } from '../../services/avisos.service.js';
import AvisoTable from '../../components/AvisoTable';
import { useNavigate } from 'react-router-dom';

// Función auxiliar para verificar si el usuario está autenticado
const isAuthenticated = () => !!localStorage.getItem('user');

const ListarAvisos = () => {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const fetchAvisos = async () => {
    try {
      const data = isAuthenticated() ? await getAvisos() : [];
      setAvisos(data);
    } catch (error) {
      console.error('Error al cargar los avisos:', error);
    }
  };

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated());
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

  return (
    <div className="listar-avisos-container">
      <h1 className="listar-avisos-title">
        {isUserAuthenticated ? 'Mis Avisos' : 'Avisos Públicos'}
      </h1>
      <div className="avisos-table-container">
        <AvisoTable 
          avisos={avisos} 
          reportAviso={handleReport} 
        />
      </div>
    </div>
  );
};

export default ListarAvisos;
