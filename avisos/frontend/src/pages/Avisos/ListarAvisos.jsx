import React, { useEffect, useState } from 'react';
import { getAvisos, reportAviso } from '../../services/avisos.service';
import AvisoTable from '../../components/AvisoTable';
import ReportModal from '../../components/ReporteModal'; // Componente del modal
import { InputText } from 'primereact/inputtext'; // 📌 Importar InputText de PrimeReact
import '../../styles/AvisosGlobal.css'; // Importa los estilos de la tabla

const ListarAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filteredAvisos, setFilteredAvisos] = useState([]); // 📌 Nuevo estado para los avisos filtrados
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedAviso, setSelectedAviso] = useState(null);
  const [gravedad, setGravedad] = useState('Leve');
  const [comentario, setComentario] = useState('');
  const [globalFilter, setGlobalFilter] = useState(''); // 📌 Estado del filtro global

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisos();
        
        // 🔴 Filtrar avisos desactivados o vencidos
        const avisosActivos = data.filter(aviso => aviso.estado !== 'Desactivado' && aviso.estado !== 'Vencido');
        
        setAvisos(avisosActivos);
        setFilteredAvisos(avisosActivos); // Inicializar los avisos filtrados con todos los avisos activos
        setIsUserAuthenticated(!!localStorage.getItem('user'));
      } catch (error) {
        console.error('Error al cargar los avisos:', error);
      }
    };

    fetchAvisos();
  }, []);

  // 📌 Función para filtrar avisos según el texto ingresado
  useEffect(() => {
    if (!globalFilter) {
      setFilteredAvisos(avisos); // Si no hay búsqueda, mostrar todos los avisos
    } else {
      const lowerCaseFilter = globalFilter.toLowerCase();
      const filtered = avisos.filter(aviso =>
        aviso.titulo.toLowerCase().includes(lowerCaseFilter) ||
        aviso.descripcion.toLowerCase().includes(lowerCaseFilter)
      );
      setFilteredAvisos(filtered);
    }
  }, [globalFilter, avisos]);

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
      e.preventDefault();
    }

    try {
      const usuario = localStorage.getItem('user');
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
      
      <div className="search-container" style={{ marginLeft: '160px' }}>
      <span className="p-input-icon-left" style={{ display: 'flex', alignItems: 'center' }}>
    <i className="pi pi-search" style={{ paddingLeft: '10px', fontSize: '1.2rem' }} />
    <InputText
        type="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar aviso"
        className="search-input"
        style={{ paddingLeft: '35px', height: '40px', fontSize: '16px' }} 
    />
</span>
      </div>

      <div className="avisos-table-container">
        <AvisoTable
          avisos={filteredAvisos} // 📌 Usar avisos filtrados
          onReport={openReportModal}
          showDelete={false}
          showUpdate={false}
          showReport={true}
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
