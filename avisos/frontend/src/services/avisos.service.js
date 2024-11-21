import axios from './root.service'; // Configuración global de Axios

// Crear un nuevo aviso
export const createAviso = async (aviso) => {
  try {
    const response = await axios.post('/avisos', aviso);
    return response.data; // Retorna el aviso creado
  } catch (error) {
    console.error('Error al crear el aviso:', error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Obtener todos los avisos
export const getAvisos = async () => {
  try {
    const response = await axios.get('/avisos');
    return response.data; // Retorna la lista de avisos
  } catch (error) {
    console.error('Error al obtener los avisos:', error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Obtener un aviso por ID
export const getAvisoById = async (id) => {
  try {
    const response = await axios.get(`/avisos/${id}`);
    return response.data; // Retorna los datos del aviso
  } catch (error) {
    console.error(`Error al obtener el aviso con ID ${id}:`, error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Actualizar un aviso por ID
export const updateAviso = async (id, aviso) => {
  try {
    const response = await axios.put(`/avisos/${id}`, aviso);
    return response.data; // Retorna el aviso actualizado
  } catch (error) {
    console.error(`Error al actualizar el aviso con ID ${id}:`, error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Eliminar un aviso por ID
export const deleteAviso = async (id) => {
  try {
    const response = await axios.delete(`/avisos/${id}`);
    return response.data; // Retorna el mensaje de éxito
  } catch (error) {
    console.error(`Error al eliminar el aviso con ID ${id}:`, error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Reportar un aviso por ID
export const reportAviso = async (id) => {
  try {
    const response = await axios.post(`/avisos/${id}/report`);
    return response.data; // Retorna el estado del aviso tras el reporte
  } catch (error) {
    console.error(`Error al reportar el aviso con ID ${id}:`, error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Obtener los avisos del usuario autenticado
export const getAvisosByUsuario = async () => {
  try {
    const response = await axios.get('/avisos/usuario'); // Endpoint del backend
    return response.data; // Retorna la lista de avisos del usuario autenticado
  } catch (error) {
    console.error('Error al obtener los avisos del usuario:', error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};