import React from "react";
import AvisoForm from "../../components/AvisoForm";
import { createAviso } from "../../services/avisos.service.js";
import { useNavigate } from "react-router-dom";
import { showCreateSuccess, showCreateError } from "../../helpers/swaHelper";

const CrearAviso = () => {
  const navigate = useNavigate();

  const handleCreate = async (aviso) => {
    try {
      console.log("🔹 Datos recibidos en handleCreate:", aviso);
  
      const formData = new FormData();
  
      // ✅ Agregar los campos de texto igual que en Postman
      formData.append("titulo", aviso.titulo);
      formData.append("descripcion", aviso.descripcion);
      formData.append("precio", aviso.precio || ""); 
      formData.append("categoria", aviso.categoria);
      formData.append("contacto[telefono]", aviso.contacto?.telefono || "");
  
      // ✅ Asegurar que la imagen se agrega correctamente
      if (aviso.imagen) {
        formData.append("images", aviso.imagen); // 💡 Postman usa "images" en lugar de "imagenes"
      }
  
      // 🔹 Depuración: Imprimir los datos antes de enviarlos
      console.log("📤 Datos enviados en FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // Verificar que se vean correctamente
      }
  
      console.log("🔄 Llamando a createAviso...");
      const response = await createAviso(formData);
      console.log("✅ Aviso creado correctamente:", response);
  
      showCreateSuccess();
      navigate("/listar-avisos");
    } catch (error) {
      console.error("❌ Error al crear el aviso:", error);
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
