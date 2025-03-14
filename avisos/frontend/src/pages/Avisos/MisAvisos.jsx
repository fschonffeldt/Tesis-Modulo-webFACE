import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import AvisoTable from '../../components/AvisoTable';
import AvisoForm from '../../components/AvisoForm';
import { getAvisosByUsuario, deleteAviso, updateAviso } from '../../services/avisos.service';
import '../../styles/Modal.css'; // Importar estilos del modal
import { showErrorToast, showSuccessToast, showDeleteConfirm } from '../../helpers/swaHelper'; // Importa helpers
import { InputText } from 'primereact/inputtext';

// Configuración de React Modal
Modal.setAppElement('#root');

const MisAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filteredAvisos, setFilteredAvisos] = useState([]); // Para la búsqueda
  const [globalFilter, setGlobalFilter] = useState(''); // Estado de la búsqueda
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAviso, setSelectedAviso] = useState(null);

  // Obtener avisos del usuario autenticado
  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisosByUsuario();
        console.log(data);
        setAvisos(data);
        setFilteredAvisos(data); // Inicializa los avisos filtrados con todos los avisos
      } catch (error) {
        console.error('Error al obtener los avisos:', error);
        setError('No se pudieron cargar los avisos. Intenta nuevamente.');
        showErrorToast('Error al cargar los avisos.');
      }
    };

    fetchAvisos();
  }, []);

  // Filtrar avisos en tiempo real cuando cambia el input de búsqueda
  useEffect(() => {
    if (!globalFilter) {
      setFilteredAvisos(avisos);
    } else {
      const filtered = avisos.filter((aviso) =>
        aviso.titulo.toLowerCase().includes(globalFilter.toLowerCase()) ||
        aviso.descripcion.toLowerCase().includes(globalFilter.toLowerCase())
      );
      setFilteredAvisos(filtered);
    }
  }, [globalFilter, avisos]);

  // Función para eliminar un aviso
  const handleDelete = async (id) => {
    try {
      const result = await showDeleteConfirm(); // Mostrar confirmación de eliminación
      if (result.isConfirmed) {
        await deleteAviso(id);
        setAvisos((prevAvisos) => prevAvisos.filter((aviso) => aviso.id !== id));
        showSuccessToast('Aviso eliminado correctamente.');
      }
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
      showErrorToast('No se pudo eliminar el aviso. Intenta nuevamente.');
    }
  };

  // Función para abrir el modal de edición
  const openModal = (aviso) => {
    setSelectedAviso(aviso);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal de edición
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAviso(null);
  };

  // Función para actualizar un aviso
  const handleUpdate = async (updatedData) => {
    try {
      const updatedAviso = await updateAviso(selectedAviso.id, updatedData);
      setAvisos((prevAvisos) =>
        prevAvisos.map((aviso) => (aviso.id === updatedAviso.id ? updatedAviso : aviso))
      );
      closeModal();
      showSuccessToast('Aviso actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el aviso:', error);
      showErrorToast('No se pudo actualizar el aviso. Intenta nuevamente.');
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

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <AvisoTable
          avisos={filteredAvisos} // Se pasan los avisos filtrados
          onDelete={handleDelete}
          onUpdate={openModal} // Pasa openModal para que el botón "Actualizar" abra el modal
          showDelete={true} 
          showUpdate={true}
          showReport={false} // No mostramos "Reportar" en Mis Avisos
        />
      )}

      {/* Modal para actualizar un aviso */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modificar Aviso"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedAviso && (
          <AvisoForm
            onSubmit={handleUpdate}
            initialData={selectedAviso}
            title="Modificar Aviso" // Título dinámico
          />
        )}
        <button onClick={closeModal} className="close-button">
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default MisAvisos;
