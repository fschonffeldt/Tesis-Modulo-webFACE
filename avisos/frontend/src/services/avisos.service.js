import axios from './root.service'; // Configuración global de Axios
import axiosForm from './form.service';

export const createAviso = async (formData) => {
  try {
    console.log("🔄 Enviando solicitud a backend...");

    // 🔹 Depuración: Verificar que "contacto[telefono]" está en `FormData`
    console.log("📤 Datos enviados en FormData antes de la petición:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Verificar si "contacto[telefono]" está presente
    }

    const response = await axiosForm.post("/avisos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Aviso creado correctamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en la petición axios:", error);

    if (error.response) {
      console.error("❌ Respuesta del backend:", error.response.data);
    }

    throw error;
  }
};



// Obtener avisos públicos
export const getPublicAvisos = async () => {
  try {
    const response = await axios.get('/avisos/public');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los avisos públicos:', error);
    throw error;
  }
};

// Obtener avisos privados (usuarios autenticados)
export const getAvisos = async () => {
  try {
    const response = await axios.get('/avisos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token si está autenticado
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los avisos privados:', error);
    throw error;
  }
};

// Obtener un aviso por ID
export const getAvisoById = async (id) => {
  try {
    const response = await axios.get(`/avisos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el aviso con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un aviso por ID
export const updateAviso = async (id, aviso) => {
  try {
    const response = await axios.put(`/avisos/${id}`, aviso, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el aviso con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un aviso por ID
export const deleteAviso = async (id) => {
  try {
    const response = await axios.delete(`/avisos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el aviso con ID ${id}:`, error);
    throw error;
  }
};

export const reportAviso = async (avisoId, usuario, gravedad) => {
  try {
    const response = await axios.post(`/avisos/${avisoId}/reportes`, {
      usuario,
      gravedad,
    });
    return response.data;
  } catch (error) {
    console.error('Error al reportar el aviso:', error);
    throw error;
  }
};


// Obtener todos los avisos reportados (Solo Admin o Moderador)
export const getAllReportes = async () => {
  try {
    const response = await axios.get('/reportes', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los reportes:', error);
    throw error;
  }
};

// Desactivar un aviso reportado (Solo Admin o Moderador)
export const darDeBajaAviso = async (avisoId) => {
  try {
    const response = await axios.put(`/reportes/desactivar/${avisoId}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al desactivar el aviso:', error);
    throw error;
  }
};

// Actualizar un aviso reportado (Solo Admin o Moderador)
export const actualizarAvisoReportado = async (avisoId, avisoData) => {
  try {
    const response = await axios.put(`/reportes/actualizar/${avisoId}`, avisoData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el aviso reportado:', error);
    throw error;
  }
};

// Obtener los avisos del usuario autenticado
export const getAvisosByUsuario = async () => {
  try {
    const response = await axios.get('/avisos/usuario', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los avisos del usuario:', error);
    throw error;
  }
};
