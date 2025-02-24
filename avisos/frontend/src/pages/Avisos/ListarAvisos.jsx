import React, { useEffect, useState } from 'react';
import { getAvisos, reportAviso } from '../../services/avisos.service';
import AvisoTable from '../../components/AvisoTable';
import ReportModal from '../../components/ReporteModal'; // Componente del modal

const ListarAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // Estado para el modal
  const [selectedAviso, setSelectedAviso] = useState(null); // Aviso seleccionado
  const [gravedad, setGravedad] = useState('Leve'); // Gravedad predeterminada
  const [comentario, setComentario] = useState(''); // Comentario opcional

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisos();
        
        // 🔴 Filtrar avisos desactivados o vencidos
        const avisosActivos = data.filter(aviso => aviso.estado !== 'Desactivado' && aviso.estado !== 'Vencido');
        
        setAvisos(avisosActivos);
        setIsUserAuthenticated(!!localStorage.getItem('user')); // Verificar autenticación
      } catch (error) {
        console.error('Error al cargar los avisos:', error);
      }
    };

    fetchAvisos();
  }, []);

  const openReportModal = (aviso) => {
    setSelectedAviso(aviso);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedAviso(null);
    setGravedad('Leve');
    setComentario('');
  };

  const handleReport = async (e, avisoId, formData) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Prevenir el comportamiento por defecto
    }
  
    try {
      const usuario = localStorage.getItem('user'); // Usuario autenticado
      const response = await reportAviso(avisoId, usuario, formData.gravedad, formData.comentario);
  
      alert(response.message || 'Reporte registrado con éxito.');
      closeReportModal();
    } catch (error) {
      console.error('Error al reportar el aviso:', error);
      alert('Hubo un problema al reportar el aviso. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="listar-avisos-container">
      <h1 className="listar-avisos-title">{isUserAuthenticated ? 'Avisos' : 'Avisos Públicos'}</h1>
      <div className="avisos-table-container">
        <AvisoTable
          avisos={avisos}
          onReport={openReportModal} // Pasar la función para abrir el modal
          showDelete={false}  // Oculta el botón "Eliminar"
          showUpdate={false}  // Oculta el botón "Actualizar"
          showReport={true}   // Asegura que el botón "Reportar" siga visible
        />
      </div>

      {/* Modal para reportar aviso */}
      {isReportModalOpen && (
        <ReportModal
          aviso={selectedAviso}
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

export default ListarAvisos;