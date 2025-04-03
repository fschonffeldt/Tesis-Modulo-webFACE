import React, { useState } from 'react';
import Modal from 'react-modal';
import "../styles/Modal.css";
import { reportAviso } from '../services/avisos.service';

const ReporteModal = ({ aviso, onClose, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    gravedad: 'Leve',
    comentario: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, aviso);
    onSubmit(e, aviso.id, formData);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 style={{ color: '#000', fontWeight: 'bold' }}>{title}</h2>

      <form onSubmit={handleSubmit}>
        <p>
        <strong style={{ color: '#000', fontWeight: 'bold' }}>
          Título del aviso:
        </strong>{" "}
        <span style={{ color: '#000', }}>
          {aviso?.titulo || 'Información no disponible'}
        </span>
      </p>


        <label htmlFor="gravedad" style={{ color: '#000', fontWeight: 'bold' }}>
          Gravedad del reporte
        </label>
        <select
          id="gravedad"
          name="gravedad"
          value={formData.gravedad}
          onChange={handleChange}
          required
          style={{ color: '#000', fontWeight: 'bold' }}
        >
          <option value="Leve">Leve</option>
          <option value="Media">Media</option>
          <option value="Grave">Grave</option>
        </select>

        <label htmlFor="comentario" style={{ color: '#000', fontWeight: 'bold' }}>
          Comentario (opcional)
        </label>
        <textarea
          id="comentario"
          name="comentario"
          value={formData.comentario}
          onChange={handleChange}
          placeholder="Escribe un comentario adicional"
          style={{ color: '#000' }}
        />

        <div className="modal-buttons">
          <button type="submit" className="submit-button">Enviar Reporte</button>
        </div>
      </form>
    </Modal>
  );
};

export default ReporteModal;
