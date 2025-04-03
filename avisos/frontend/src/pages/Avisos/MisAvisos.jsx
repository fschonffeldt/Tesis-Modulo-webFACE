import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import AvisoTable from "../../components/AvisoTable";
import AvisoForm from "../../components/AvisoForm";
import {
  getAvisosByUsuario,
  deleteAviso,
  updateAviso,
  desactivarAvisoUsuario,
  renovarAvisoUsuario
} from "../../services/avisos.service";
import "../../styles/Modal.css";
import { showErrorToast, showSuccessToast, showDeleteConfirm } from "../../helpers/swaHelper";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

Modal.setAppElement("#root");

const MisAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filteredAvisos, setFilteredAvisos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAviso, setSelectedAviso] = useState(null);
  const [avisosPorVencer, setAvisosPorVencer] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisosByUsuario();
        setAvisos(data);
        setFilteredAvisos(data);

        const ahora = new Date();
        const sieteDiasDespues = new Date();
        sieteDiasDespues.setDate(ahora.getDate() + 7);

        const porVencer = data.filter(aviso => {
          const fechaExpiracion = new Date(aviso.fechaExpiracion);
          return aviso.estado === "Vigente" && fechaExpiracion >= ahora && fechaExpiracion <= sieteDiasDespues;
        });

        setAvisosPorVencer(porVencer);
        if (porVencer.length > 0) setIsDialogVisible(true);
      } catch (error) {
        console.error("Error al obtener los avisos:", error);
        setError("No se pudieron cargar los avisos.");
        showErrorToast("Error al cargar los avisos.");
      }
    };

    fetchAvisos();
  }, []);

  useEffect(() => {
    let filtrados = avisos;

    if (globalFilter) {
      const lower = globalFilter.toLowerCase();
      filtrados = filtrados.filter(aviso =>
        aviso.titulo.toLowerCase().includes(lower) ||
        aviso.descripcion.toLowerCase().includes(lower)
      );
    }

    if (tagFilter) {
      const lowerTag = tagFilter.toLowerCase();
      filtrados = filtrados.filter(aviso =>
        aviso.tags && aviso.tags.some(tag => tag.toLowerCase().includes(lowerTag))
      );
    }

    setFilteredAvisos(filtrados);
  }, [avisos, globalFilter, tagFilter]);

  const handleRenovarAviso = async (avisoId) => {
    try {
      const response = await renovarAvisoUsuario(avisoId);
      setAvisos(prev => prev.map(a => a.id === avisoId ? { ...a, fechaExpiracion: response.aviso.fechaExpiracion } : a));
      showSuccessToast("✅ Aviso renovado por 30 días más.");
      setIsDialogVisible(false);
    } catch (error) {
      console.error("Error al renovar:", error);
      showErrorToast("⚠️ Error al renovar el aviso.");
    }
  };

  const handleDesactivarAviso = async (avisoId) => {
    try {
      await desactivarAvisoUsuario(avisoId);
      setAvisos(prev => prev.filter(a => a.id !== avisoId));
      showSuccessToast("🛑 Aviso desactivado.");
      setIsDialogVisible(false);
    } catch (error) {
      console.error("Error al desactivar:", error);
      showErrorToast("⚠️ Error al desactivar.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await showDeleteConfirm();
      if (result.isConfirmed) {
        await deleteAviso(id);
        setAvisos(prev => prev.filter(a => a.id !== id));
        showSuccessToast("✅ Aviso eliminado.");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      showErrorToast("⚠️ Error al eliminar.");
    }
  };

  const openModal = (aviso) => {
    setSelectedAviso(aviso);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAviso(null);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const updatedAviso = await updateAviso(selectedAviso.id, updatedData);
      setAvisos(prev => prev.map(a => (a.id === updatedAviso.id ? updatedAviso : a)));
      closeModal();
      showSuccessToast("✅ Aviso actualizado.");
    } catch (error) {
      console.error("Error al actualizar:", error);
      showErrorToast("⚠️ No se pudo actualizar.");
    }
  };

  return (
    <div className="listar-avisos-container">
      <div className="search-container" style={{ marginLeft: '160px', display: 'flex', gap: '20px' }}>
        {/* Buscador */}
        <span className="p-input-icon-left">
          <i className="pi pi-search" style={{ paddingLeft: "10px", fontSize: "1.2rem" }} />
          <InputText
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar aviso"
            style={{ paddingLeft: "35px", height: "40px", fontSize: "16px" }}
          />
        </span>

        {/* 🆕 Tag */}
        <span className="p-input-icon-left">
          <i className="pi pi-tags" style={{ paddingLeft: "10px", fontSize: "1.2rem" }} />
          <InputText
            type="text"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="Filtrar por tag"
            style={{ paddingLeft: "35px", height: "40px", fontSize: "16px", width: "250px" }}
          />
        </span>
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <AvisoTable
          avisos={filteredAvisos}
          onDelete={handleDelete}
          onUpdate={openModal}
          showDelete={true}
          showUpdate={true}
          showReport={false}
        />
      )}

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
          <div key={aviso.id} style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}>
              El aviso titulado:
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#007bff", marginBottom: "5px" }}>
              {aviso.titulo}
            </p>
            <p style={{ fontSize: "1rem", color: "#555", marginTop: "5px" }}>
              Expira el {new Date(aviso.fechaExpiracion).toLocaleDateString()}.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Button label="🔄 Renovar" className="p-button-success p-button-sm" onClick={() => handleRenovarAviso(aviso.id)} />
              <Button label="🛑 Desactivar" className="p-button-danger p-button-sm" onClick={() => handleDesactivarAviso(aviso.id)} />
            </div>
          </div>
        ))}
      </Dialog>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Modificar Aviso" className="modal-content" overlayClassName="modal-overlay">
        {selectedAviso && <AvisoForm onSubmit={handleUpdate} initialData={selectedAviso} title="Modificar Aviso" />}
        <button onClick={closeModal} className="close-button">Cerrar</button>
      </Modal>
    </div>
  );
};

export default MisAvisos;
