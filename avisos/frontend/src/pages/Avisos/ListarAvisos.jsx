import React, { useEffect, useState } from 'react';
import { getAvisos, deleteAviso, reportAviso } from '../../services/avisos.service.js';
import AvisoTable from '../../components/AvisoTable';

const ListarAviso = () => {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const fetchAvisos = async () => {
      const data = await getAvisos();
      setAvisos(data);
    };
    fetchAvisos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este aviso?')) {
      await deleteAviso(id);
      setAvisos(avisos.filter((aviso) => aviso.id !== id));
    }
  };

  const handleReport = async (id) => {
    await reportAviso(id);
    alert('Aviso reportado.');
  };

  return (
    <div>
      <AvisoTable avisos={avisos} onDelete={handleDelete} onReport={handleReport} />
    </div>
  );
};

export default ListarAviso;
