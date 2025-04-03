import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { Button } from "primereact/button";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import "../styles/AvisoTable.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

const AvisoTable = ({
  avisos,
  showReport = true,
  showDelete = true,
  showUpdate = true,
  onUpdate = () => {},
  onDelete = () => {},
  onReport = () => {},
}) => {
  const [selectedAviso, setSelectedAviso] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useRef(null);
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
      <Toast ref={toast} />
      <h1 className="text-center"></h1>

      <div className="avisos-grid">
        {avisos.length > 0 ? (
          avisos.map((aviso) => (
            <div key={aviso.id} className="aviso-card">
              <div className="speeddial-container">
                <SpeedDial
                  model={[
                    ...(showReport
                      ? [
                          {
                            label: "Reportar",
                            icon: "pi pi-flag",
                            command: () => onReport(aviso),
                          },
                        ]
                      : []),
                    ...(showDelete
                      ? [
                          {
                            label: "Eliminar",
                            icon: "pi pi-trash",
                            command: () => onDelete(aviso.id),
                          },
                        ]
                      : []),
                    ...(showUpdate
                      ? [
                          {
                            label: "Actualizar",
                            icon: "pi pi-refresh",
                            command: () => onUpdate(aviso),
                          },
                        ]
                      : []),
                    {
                      label: "Compartir",
                      icon: "pi pi-share-alt",
                      command: () => {
                        navigator.share
                          ? navigator
                              .share({
                                title: aviso.titulo,
                                text: aviso.descripcion,
                              })
                              .then(() =>
                                toast.current.show({
                                  severity: "info",
                                  summary: "Compartido",
                                  detail: `El aviso "${aviso.titulo}" fue compartido exitosamente`,
                                })
                              )
                              .catch(() =>
                                toast.current.show({
                                  severity: "error",
                                  summary: "Error al compartir",
                                  detail: `No se pudo compartir el aviso "${aviso.titulo}"`,
                                })
                              )
                          : toast.current.show({
                              severity: "info",
                              summary: "Compartir no soportado",
                              detail: "La funcionalidad no está disponible en este navegador",
                            });
                      },
                    },
                  ]}
                  direction="down"
                  style={{ background: "none", boxShadow: "none" }}
                />
              </div>

              <div className="aviso-image-container">
                {aviso.imagenes && aviso.imagenes.length > 0 ? (
                  <img src={`${API_URL}/${aviso.imagenes[0]}`} alt="Aviso" />
                ) : (
                  <i className="pi pi-home aviso-icon"></i>
                )}
              </div>

              <h5 className="aviso-title">{aviso.titulo}</h5>
              <p className="aviso-description">{aviso.descripcion}</p>

              {/* ✅ Mostrar tags */}
              {aviso.tags && aviso.tags.length > 0 && (
                <div className="tags-container" style={{ marginBottom: '10px' }}>
                  <strong style={{ color: "#000" }}>Tags:</strong>{" "}
                  {aviso.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#e0e0e0",
                        color: "#333",
                        padding: "2px 8px",
                        marginRight: "5px",
                        borderRadius: "12px",
                        fontSize: "0.85rem",
                        display: "inline-block",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

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

      {/* Modal con la información completa del aviso */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedAviso && (
          <div className="popup-container">
            {selectedAviso.imagenes && selectedAviso.imagenes.length > 0 && (
              <img
                src={`${API_URL}/${selectedAviso.imagenes[0]}`}
                alt="Aviso"
                className="popup-image"
              />
            )}

            <h2 className="popup-title">{selectedAviso.titulo}</h2>
            <p className="popup-description">{selectedAviso.descripcion}</p>

            {selectedAviso.precio && (
              <p>
                <strong style={{ color: "#000" }}>Precio:</strong>{" "}
                <span style={{ color: "#000", fontWeight: "normal" }}>
                  ${selectedAviso.precio}
                </span>
              </p>
            )}

            {selectedAviso.contacto && (
              <>
                {selectedAviso.contacto.telefono && (
                  <p>
                    <strong style={{ color: "#000" }}>Teléfono:</strong>{" "}
                    <span style={{ color: "#000", fontWeight: "normal" }}>
                      {selectedAviso.contacto.telefono}
                    </span>
                  </p>
                )}

                {selectedAviso.contacto.email && (
                  <p>
                    <strong style={{ color: "#000" }}>Correo:</strong>{" "}
                    <span style={{ color: "#000", fontWeight: "normal" }}>
                      {selectedAviso.contacto.email}
                    </span>
                  </p>
                )}
              </>
            )}

            {selectedAviso.fechaPublicacion && (
              <p>
                <strong style={{ color: "#000" }}>Fecha de Publicación:</strong>{" "}
                <span style={{ color: "#000", fontWeight: "normal" }}>
                  {new Date(selectedAviso.fechaPublicacion).toLocaleDateString()}
                </span>
              </p>
            )}

            {/* ✅ Mostrar tags en el modal */}
            {selectedAviso.tags && selectedAviso.tags.length > 0 && (
              <div className="tags-modal" style={{ marginTop: '10px' }}>
                <strong style={{ color: "#000" }}>Tags:</strong>{" "}
                {selectedAviso.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: "#f0f0f0",
                      color: "#000",
                      padding: "4px 10px",
                      margin: "4px",
                      borderRadius: "15px",
                      display: "inline-block",
                      fontSize: "0.9rem",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
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

export default AvisoTable;
