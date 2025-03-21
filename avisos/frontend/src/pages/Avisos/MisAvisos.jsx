import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import AvisoTable from "../../components/AvisoTable";
import AvisoForm from "../../components/AvisoForm";
import { getAvisosByUsuario, deleteAviso, updateAviso, desactivarAvisoUsuario, renovarAvisoUsuario } from "../../services/avisos.service";
import "../../styles/Modal.css"; 
import { showErrorToast, showSuccessToast, showDeleteConfirm } from "../../helpers/swaHelper"; 
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";  // 📌 Importamos Dialog de PrimeReact
import { Button } from "primereact/button"; // 📌 Importamos Button de PrimeReact

// Configuración de React Modal
Modal.setAppElement("#root");

const MisAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filteredAvisos, setFilteredAvisos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAviso, setSelectedAviso] = useState(null);
  const [avisosPorVencer, setAvisosPorVencer] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false); // 📌 Estado para el popup emergente

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisosByUsuario();
        setAvisos(data);
        setFilteredAvisos(data);

        // 📌 Filtrar avisos que vencerán en los próximos 7 días
        const ahora = new Date();
        const sieteDiasDespues = new Date();
        sieteDiasDespues.setDate(ahora.getDate() + 7);

        const porVencer = data.filter(aviso => {
          const fechaExpiracion = new Date(aviso.fechaExpiracion);
          return aviso.estado === "Vigente" && fechaExpiracion >= ahora && fechaExpiracion <= sieteDiasDespues;
        });

        setAvisosPorVencer(porVencer);

        // 📌 Mostrar el popup si hay avisos por vencer
        if (porVencer.length > 0) {
          setIsDialogVisible(true);
        }
      } catch (error) {
        console.error("Error al obtener los avisos:", error);
        setError("No se pudieron cargar los avisos. Intenta nuevamente.");
        showErrorToast("Error al cargar los avisos.");
      }
    };

    fetchAvisos();
  }, []);

  // 📌 Función para renovar un aviso
  const handleRenovarAviso = async (avisoId) => {
    try {
      const response = await renovarAvisoUsuario(avisoId);
      setAvisos(prevAvisos =>
        prevAvisos.map(aviso =>
          aviso.id === avisoId ? { ...aviso, fechaExpiracion: response.aviso.fechaExpiracion } : aviso
        )
      );
      showSuccessToast("✅ Aviso renovado por 30 días más.");
      setIsDialogVisible(false);
    } catch (error) {
      console.error("Error al renovar el aviso:", error);
      showErrorToast("⚠️ Hubo un problema al renovar el aviso.");
    }
  };

  // 📌 Función para desactivar un aviso
  const handleDesactivarAviso = async (avisoId) => {
    try {
      await desactivarAvisoUsuario(avisoId);
      setAvisos(prevAvisos => prevAvisos.filter(aviso => aviso.id !== avisoId));
      showSuccessToast("🛑 Aviso desactivado correctamente.");
      setIsDialogVisible(false);
    } catch (error) {
      console.error("Error al desactivar el aviso:", error);
      showErrorToast("⚠️ Hubo un problema al desactivar el aviso.");
    }
  };

  // 📌 Función para eliminar un aviso
  const handleDelete = async (id) => {
    try {
      const result = await showDeleteConfirm();
      if (result.isConfirmed) {
        await deleteAviso(id);
        setAvisos(prevAvisos => prevAvisos.filter(aviso => aviso.id !== id));
        showSuccessToast("✅ Aviso eliminado correctamente.");
      }
    } catch (error) {
      console.error("Error al eliminar el aviso:", error);
      showErrorToast("⚠️ No se pudo eliminar el aviso.");
    }
  };

  // 📌 Función para abrir el modal de edición
  const openModal = (aviso) => {
    setSelectedAviso(aviso);
    setIsModalOpen(true);
  };

  // 📌 Función para cerrar el modal de edición
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAviso(null);
  };

  // 📌 Función para actualizar un aviso
  const handleUpdate = async (updatedData) => {
    try {
      const updatedAviso = await updateAviso(selectedAviso.id, updatedData);
      setAvisos(prevAvisos =>
        prevAvisos.map(aviso => (aviso.id === updatedAviso.id ? updatedAviso : aviso))
      );
      closeModal();
      showSuccessToast("✅ Aviso actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el aviso:", error);
      showErrorToast("⚠️ No se pudo actualizar el aviso.");
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
          avisos={filteredAvisos}
          onDelete={handleDelete}
          onUpdate={openModal} // 🔥✅ Agregado para habilitar el botón de actualizar
          showDelete={true}
          showUpdate={true}
          showReport={false}
        />
      )}

      {/* 📌 Pestaña emergente con PrimeReact Dialog */}
      <Dialog
        visible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        header={<span className="aviso-dialog-header">⚠️ Avisos por Vencer</span>}
        modal
        className="p-fluid"
      >
        <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#333", textAlign: "center" }}>
          Los siguientes avisos están por vencer en menos de 7 días:
        </p>
        {avisosPorVencer.map(aviso => (
          <div key={aviso.id} className="aviso-dialog-item" style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}>
              El aviso titulado:
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#007bff", marginBottom: "5px" }}>
              {aviso.titulo}
            </p>
            <p style={{ fontSize: "1rem", color: "#555", marginTop: "5px" }}>
              Expira el {new Date(aviso.fechaExpiracion).toLocaleDateString()}.
            </p>
            <div className="aviso-dialog-buttons">
              <Button label="🔄 Renovar" className="p-button-success p-button-sm" onClick={() => handleRenovarAviso(aviso.id)} />
              <Button label="🛑 Desactivar" className="p-button-danger p-button-sm" onClick={() => handleDesactivarAviso(aviso.id)} />
            </div>
          </div>
        ))}
      </Dialog>

      {/* Modal para actualizar un aviso */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Modificar Aviso" className="modal-content" overlayClassName="modal-overlay">
        {selectedAviso && <AvisoForm onSubmit={handleUpdate} initialData={selectedAviso} title="Modificar Aviso" />}
        <button onClick={closeModal} className="close-button">Cerrar</button>
      </Modal>

    </div>
  );
};

export default MisAvisos;
