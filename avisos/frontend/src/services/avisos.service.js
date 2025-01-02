import axios from './root.service'; // Configuración global de Axios

// Crear un nuevo aviso
export const createAviso = async (aviso) => {
  try {
    const response = await axios.post('/avisos', aviso);
    return response.data;
  } catch (error) {
    console.error('Error al crear el aviso:', error);
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

// Obtener datos de contacto de un aviso por ID
export const getAvisoContactInfo = async (id) => {
  try {
    const response = await axios.get(`/avisos/${id}/contacto`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token si es necesario
      },
    });
    return response.data; // Los datos de contacto del aviso
  } catch (error) {
    console.error(`Error al obtener los datos de contacto del aviso con ID ${id}:`, error);
    throw error;
  }
};