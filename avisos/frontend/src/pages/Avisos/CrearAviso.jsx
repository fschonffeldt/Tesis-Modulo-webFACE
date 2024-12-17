import React from "react";
import AvisoForm from "../../components/AvisoForm";
import { createAviso } from "../../services/avisos.service.js";
import { useNavigate } from "react-router-dom";

const CrearAviso = () => {
  const navigate = useNavigate();

  const handleCreate = async (aviso) => {
    // Ajustar el objeto "aviso" para anidar "telefono" dentro de "contacto"
    const avisoData = {
      ...aviso,
      contacto: {
        telefono: aviso.telefono, // Anidado en contacto
      },
    };

    try {
      await createAviso(avisoData); // Llamada al servicio
      alert("Aviso creado exitosamente.");
      navigate("/listar-avisos"); // Redirigir después de crear el aviso
    } catch (error) {
      console.error("Error al crear el aviso:", error);
      alert("Ocurrió un error al crear el aviso. Intenta nuevamente.");
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
