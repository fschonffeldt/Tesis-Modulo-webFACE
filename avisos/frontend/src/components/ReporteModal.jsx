import React, { useState } from 'react';
import Modal from 'react-modal';
import "../styles/Modal.css";
import { reportAviso } from '../services/avisos.service';
const ReporteModal = ({ aviso, onClose, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    gravedad: 'Leve', // Valor predeterminado
    comentario: '', // Comentario opcional
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, aviso)
    onSubmit(e,aviso.id, formData); // Llama a la función de reporte con los datos del formulario
    onClose(); // Cierra el modal
  };


  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <p><strong>Aviso:</strong> {aviso?.titulo || 'Información no disponible'}</p>

        <label htmlFor="gravedad">Gravedad del reporte</label>
        <select
          id="gravedad"
          name="gravedad"
          value={formData.gravedad}
          onChange={handleChange}
          required
        >
          <option value="Leve">Leve</option>
          <option value="Media">Media</option>
          <option value="Grave">Grave</option>
        </select>

        <label htmlFor="comentario">Comentario (opcional)</label>
        <textarea
          id="comentario"
          name="comentario"
          value={formData.comentario}
          onChange={handleChange}
          placeholder="Escribe un comentario adicional"
        />

        <div className="modal-buttons">
          <button type="submit" className="submit-button">Enviar Reporte</button>
          <button type="button" onClick={onClose} className="close-button">Cerrar</button>
        </div>
      </form>
    </Modal>
  );
};

export default ReporteModal;
