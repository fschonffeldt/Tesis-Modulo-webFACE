import React, { useEffect, useState } from 'react';
import AvisoForm from '../../components/AvisoForm';
import { getAvisoById, updateAviso } from '../../services/avisos.service.js';
import { useParams, useNavigate } from 'react-router-dom';

const EditarAviso = () => {
  const { id } = useParams();
  const [aviso, setAviso] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAviso = async () => {
      const data = await getAvisoById(id);
      setAviso(data);
    };
    fetchAviso();
  }, [id]);

  const handleEdit = async (updatedAviso) => {
    await updateAviso(id, updatedAviso);
    alert('Aviso actualizado.');
    navigate('/listar-avisos');
  };

  return (
    <div>
      <h1>Editar Aviso</h1>
      {aviso ? <AvisoForm onSubmit={handleEdit} initialData={aviso} /> : <p>Cargando...</p>}
    </div>
  );
};

export default EditarAviso;
