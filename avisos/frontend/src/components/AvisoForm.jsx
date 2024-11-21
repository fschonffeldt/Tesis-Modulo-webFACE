import React, { useState } from 'react';
import '../styles/AvisoForm.css'; // Archivo CSS para estilos

const AvisoForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    titulo: '',
    descripcion: '',
    precio: '',
    categoria: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="aviso-form-container">
      <h1 className="form-title">Crear Aviso</h1>
      <form onSubmit={handleSubmit} className="aviso-form">
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Título del aviso"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Escribe una breve descripción"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Ingrese el precio"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione una categoría</option>
            <option value="electrónica">Electrónica</option>
            <option value="muebles">Muebles</option>
            <option value="vehículos">Vehículos</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Número de contacto"
            required
          />
        </div>

        <button type="submit" className="submit-button">Crear Aviso</button>
      </form>
    </div>
  );
};

export default AvisoForm;
