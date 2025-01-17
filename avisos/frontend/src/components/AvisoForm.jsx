import React, { useState } from 'react';
import '../styles/AvisoForm.css';

const AvisoForm = ({ onSubmit, initialData, title = "Crear Aviso" }) => {
  const [formData, setFormData] = useState(initialData || {
    titulo: '',
    descripcion: '',
    precio: '',
    categoria: '',
    telefono: '',
  });
  const [sinPrecio, setSinPrecio] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setSinPrecio(!sinPrecio);
    setFormData({ ...formData, precio: '' }); // Limpia el campo de precio si se desactiva
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="aviso-form-container">
      <h1 className="form-title">{title}</h1>
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

        <div className="form-group precio-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="00000"
            disabled={sinPrecio} // Desactiva el campo si la casilla está marcada
          />
          <div className="sin-precio-container">
          <input
          type="checkbox"
          id="sinPrecio"
          name="sinPrecio"
          checked={sinPrecio}
          onChange={handleCheckboxChange}
          />
           <label htmlFor="sinPrecio">Sin precio</label>
          </div>
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
            <option value="Educación">Educación</option>
            <option value="Venta">Venta</option>
            <option value="Compra">Compra</option>
            <option value="Habitacional">Habitacional</option>
            <option value="Otros">Otros</option>
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

        <button type="submit" className="submit-button">
          {title === "Crear Aviso" ? "Crear Aviso" : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
};

export default AvisoForm;
