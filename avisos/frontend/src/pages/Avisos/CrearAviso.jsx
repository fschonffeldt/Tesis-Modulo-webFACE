import React from "react";
import AvisoForm from "../../components/AvisoForm";
import { createAviso } from "../../services/avisos.service.js";
import { useNavigate } from "react-router-dom";
import { showCreateSuccess, showCreateError } from "../../helpers/swaHelper";

const CrearAviso = () => {
  const navigate = useNavigate();

  const handleCreate = async (aviso) => {
    try {
      // Crear un FormData para enviar los datos y la imagen
      const formData = new FormData();

      // Agregar los campos al FormData
      formData.append('titulo', aviso.titulo);
      formData.append('descripcion', aviso.descripcion);
      formData.append('precio', aviso.precio || '');
      formData.append('categoria', aviso.categoria);
      formData.append('contacto[telefono]', aviso.telefono);

      // Agregar la imagen solo si existe
      if (aviso.imagen) {
        formData.append('imagen', aviso.imagen);  // Nombre del campo debe coincidir con el backend
      }

      // Llamar al servicio para crear el aviso
      await createAviso(formData);

      // Mostrar mensaje de éxito y redirigir
      showCreateSuccess();
      navigate("/listar-avisos");
    } catch (error) {
      console.error("Error al crear el aviso:", error);
      showCreateError("Ocurrió un error al crear el aviso. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <h1>Crear Aviso</h1>
      <AvisoForm onSubmit={handleCreate} />
    </div>
  );
};

export default CrearAviso;
