import React, { useEffect, useState } from 'react';
import { getAvisoById, reportAviso } from '../../services/avisos.service';
import { useParams, useNavigate } from 'react-router-dom';
import ReportModal from '../../components/ReporteModal';

const ReportarAviso = () => {
  const { id } = useParams(); // Obtener ID del aviso desde la URL
  const [aviso, setAviso] = useState(null); // Estado para almacenar el aviso
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [gravedad, setGravedad] = useState('Leve'); // Estado para la gravedad del reporte
  const [comentario, setComentario] = useState(''); // Estado para comentarios opcionales
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

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setGravedad('Leve'); // Restablecer gravedad
    setComentario(''); // Restablecer comentario
  };

  const handleReport = async () => {
    try {
      const usuario = localStorage.getItem('user'); // Usuario autenticado
      const response = await reportAviso(id, usuario, gravedad, comentario); // Llamada a la API para reportar
      alert(response.message || 'Reporte registrado con éxito.');
      closeReportModal();
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
          <p><strong>Precio:</strong> ${aviso.precio || 'N/A'}</p>
          <p><strong>Categoría:</strong> {aviso.categoria || 'Sin categoría'}</p>
          <button onClick={openReportModal}>Reportar</button>
          <button onClick={() => navigate('/listar-avisos')}>Volver</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}

      {/* Modal para Reportar Aviso */}
      {isReportModalOpen && (
        <ReportModal
          aviso={aviso}
          onClose={closeReportModal}
          onSubmit={handleReport}
          title="Reportar Aviso"
          gravedad={gravedad}
          setGravedad={setGravedad}
          comentario={comentario}
          setComentario={setComentario}
        />
      )}
    </div>
  );
};

export default ReportarAviso;
