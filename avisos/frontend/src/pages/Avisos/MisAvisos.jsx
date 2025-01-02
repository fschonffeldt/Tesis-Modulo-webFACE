import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import AvisoTable from '../../components/AvisoTable';
import AvisoForm from '../../components/AvisoForm';
import { getAvisosByUsuario, deleteAviso, updateAviso, getReportesByAviso } from '../../services/avisos.service';
import '../../styles/Modal.css'; // Importar estilos del modal

// Configuración de React Modal
Modal.setAppElement('#root');

const MisAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAviso, setSelectedAviso] = useState(null);

  // Obtener avisos del usuario autenticado
  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisosByUsuario();
        setAvisos(data);
      } catch (error) {
        console.error('Error al obtener los avisos:', error);
        setError('No se pudieron cargar los avisos. Intenta nuevamente.');
      }
    };

    fetchAvisos();
  }, []);

  // Función para eliminar un aviso
  const handleDelete = async (id) => {
    try {
      if (window.confirm('¿Estás seguro de que deseas eliminar este aviso?')) {
        await deleteAviso(id);
        setAvisos((prevAvisos) => prevAvisos.filter((aviso) => aviso.id !== id));
        alert('Aviso eliminado correctamente.');
      }
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
      alert('No se pudo eliminar el aviso. Intenta nuevamente.');
    }
  };

  // Función para abrir el modal y editar un aviso
  const openModal = (aviso) => {
    setSelectedAviso(aviso);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
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
      alert('Aviso actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el aviso:', error);
      alert('No se pudo actualizar el aviso. Intenta nuevamente.');
    }
  };

  return (
    <div className="listar-avisos-container">
      <h1>Mis Avisos</h1>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <AvisoTable
          avisos={avisos}
          onReport={() => alert('Función de reporte aún no implementada')}
          onDelete={handleDelete}
          onEdit={openModal} // Función para abrir el modal
          showActions={true}
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
