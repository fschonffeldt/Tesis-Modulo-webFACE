import React, { useEffect, useState } from 'react';
import { getAvisoById, reportAviso } from '../../services/avisos.service';
import { useParams, useNavigate } from 'react-router-dom';

const ReportarAviso = () => {
  const { id } = useParams(); // Obtener ID del aviso desde la URL
  const [aviso, setAviso] = useState(null); // Estado para almacenar el aviso
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAviso = async () => {
      try {
        const data = await getAvisoById(id); // Llamada a la API para obtener el aviso
        setAviso(data);
      } catch (error) {
        console.error('Error al cargar el aviso:', error);
      }
    };
    fetchAviso();
  }, [id]);

  const handleReport = async () => {
    const gravedad = prompt('Selecciona la gravedad del reporte: Leve, Media, Alta');

    if (!['Leve', 'Media', 'Alta'].includes(gravedad)) {
      alert('Gravedad inválida.');
      return;
    }

    try {
      const usuario = localStorage.getItem('user'); // Usuario autenticado
      const response = await reportAviso(id, usuario, gravedad); // Llamada a la API para reportar
      alert(response.message || 'Reporte registrado con éxito.');
      navigate('/listar-avisos'); // Redirigir después de reportar
    } catch (error) {
      console.error('Error al reportar el aviso:', error);
      alert('Hubo un problema al reportar el aviso.');
    }
  };

  return (
    <div>
      <h1>Reportar Aviso</h1>
      {aviso ? (
        <div>
          <h2>{aviso.titulo}</h2>
          <p>{aviso.descripcion}</p>
          <button onClick={handleReport}>Reportar</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ReportarAviso;
