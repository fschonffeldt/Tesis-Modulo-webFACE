import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'primereact/button';
import "../styles/AvisoTable.css";

const AvisoTable = ({ avisos }) => {
  const [selectedAviso, setSelectedAviso] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const handleMoreInfoClick = (aviso) => {
    setSelectedAviso(aviso);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
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
              {/* Imagen circular en lugar del ícono */}
              <div className="aviso-image-container">
                {aviso.imagenes && aviso.imagenes.length > 0 ? (
                  <img
                    src={aviso.imagenes[0]}
                    alt="Imagen del aviso"
                    className="aviso-image"
                  />
                ) : (
                  <i className="pi pi-home aviso-icon"></i>
                )}
              </div>

              <h5 className="aviso-title">AVISO</h5>
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

      {/* Modal para detalles del aviso */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedAviso && (
          <div className="popup-container">
            <h2 className="popup-title">{selectedAviso.titulo}</h2>
            <div className="popup-content">
              {/* Imágenes del aviso */}
              <div className="popup-images">
                {selectedAviso.imagenes?.map((imagen, index) => (
                  <img
                    key={index}
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className="popup-image"
                  />
                ))}
              </div>

              {/* Descripción */}
              <p className="popup-description">{selectedAviso.descripcion}</p>

              {/* Botón para reportar */}
              <Button
                label="Reportar Aviso"
                icon="pi pi-flag"
                className="p-button-danger popup-button"
                onClick={() => alert('Reporte enviado')}
              />

              {/* Botón para cerrar */}
              <Button
                label="Cerrar"
                icon="pi pi-times"
                className="p-button-secondary close-button"
                onClick={closeModal}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AvisoTable;
