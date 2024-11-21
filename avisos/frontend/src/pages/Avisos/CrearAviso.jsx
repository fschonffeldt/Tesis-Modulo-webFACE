import React from 'react';
import AvisoForm from '../../components/AvisoForm';
import { createAviso } from '../../services/avisos.service.js';
import { useNavigate } from 'react-router-dom';

const CrearAviso = () => {
  const navigate = useNavigate();

  const handleCreate = async (aviso) => {
    await createAviso(aviso);
    alert('Aviso creado exitosamente.');
    navigate('/listar-avisos');
  };

  return (
    <div>
      <h1>Crear Aviso</h1>
      <AvisoForm onSubmit={handleCreate} />
    </div>
  );
};

export default CrearAviso;
