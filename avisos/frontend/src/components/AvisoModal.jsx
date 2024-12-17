import React, { useState } from 'react';
import Modal from 'react-modal';
import "../styles/Modal.css";

const AvisoModal = ({ aviso, onClose, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    titulo: aviso?.titulo || '',
    descripcion: aviso?.descripcion || '',
    precio: aviso?.precio || '',
    categoria: aviso?.categoria || '',
    telefono: aviso?.contacto?.telefono || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(aviso.id, formData); // Actualizar con el ID correcto
    onClose();
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
        <label>Título</label>
        <input
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />

        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />

        <label>Categoría</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          <option value="Educación">Educación</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Otros">Otros</option>
        </select>

        <label>Teléfono</label>
        <input
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">Guardar Cambios</button>
        <button type="button" className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </form>
    </Modal>
  );
};

export default AvisoModal;
