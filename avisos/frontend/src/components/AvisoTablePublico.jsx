import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "primereact/button";
import "../styles/AvisoTable.css";

const AvisoTablePublico = ({ avisos }) => {
  const [selectedAviso, setSelectedAviso] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_IMAGE_URL || "http://localhost:3000";

  const handleMoreInfoClick = (aviso) => {
    setSelectedAviso(aviso);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAviso(null);
  };

  return (
    <div className="avisos-container">
      <h1 className="text-center">Avisos</h1>

      <div className="avisos-grid">
        {avisos.length > 0 ? (
          avisos.map((aviso) => (
            <div key={aviso.id} className="aviso-card">
              <div className="aviso-image-container">
                {aviso.imagenes && aviso.imagenes.length > 0 ? (
                  <img src={`${API_URL}/${aviso.imagenes[0]}`} alt="Aviso" className="aviso-image" />
                ) : (
                  <i className="pi pi-image aviso-icon"></i>
                )}
              </div>

              <h5 className="aviso-title">{aviso.titulo}</h5>
              <p className="aviso-description">{aviso.descripcion}</p>
              <Button
                label="Más información"
                className="p-button-outlined"
                onClick={() => handleMoreInfoClick(aviso)}
              />
            </div>
          ))
        ) : (
          <p className="no-avisos-text">No hay avisos para mostrar.</p>
        )}
      </div>

      {/* ✅ Modal con la información completa del aviso */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedAviso && (
          <div className="popup-container">
            {/* ✅ Mostrar imagen si existe */}
            {selectedAviso.imagenes && selectedAviso.imagenes.length > 0 && (
              <img src={`${API_URL}/${selectedAviso.imagenes[0]}`} alt="Aviso" className="popup-image" />
            )}

            <h2 className="popup-title">{selectedAviso.titulo}</h2>
            <p className="popup-description">{selectedAviso.descripcion}</p>

            {/* ✅ Mostrar precio solo si existe */}
            {selectedAviso.precio && (
              <p>
                <strong>Precio:</strong> ${selectedAviso.precio}
              </p>
            )}

            {/* ✅ Mostrar fecha de publicación si existe */}
            {selectedAviso.fechaPublicacion && (
              <p>
                <strong>Fecha de Publicación:</strong> {new Date(selectedAviso.fechaPublicacion).toLocaleDateString()}
              </p>
            )}

            <Button
              label="Cerrar"
              icon="pi pi-times"
              className="p-button-secondary close-button"
              onClick={closeModal}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AvisoTablePublico;
