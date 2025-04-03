import React, { useState } from 'react';
import '../styles/AvisoForm.css';

const AvisoForm = ({ onSubmit, initialData, title = "Crear Aviso" }) => {
  const [formData, setFormData] = useState(initialData || {
    titulo: '',
    descripcion: '',
    precio: '',
    tags: '', // ✅ Nuevo campo para los tags
    contacto: { telefono: '' },
    imagen: null,
  });

  const [sinPrecio, setSinPrecio] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      setFormData({
        ...formData,
        contacto: { ...formData.contacto, telefono: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleCheckboxChange = () => {
    setSinPrecio(!sinPrecio);
    setFormData({ ...formData, precio: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      contacto: { telefono: formData.contacto.telefono },
    });
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
            disabled={sinPrecio}
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

        {/* ✅ Campo para tags personalizados */}
        <div className="form-group">
          <label htmlFor="tags">Tags (separados por coma)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="ej: libros, ayuda, venta"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.contacto.telefono}
            onChange={handleChange}
            placeholder="Número de contacto"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
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
