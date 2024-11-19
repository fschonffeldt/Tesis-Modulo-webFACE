import axios from './root.service';

export const crearUsuario = async (data) => {
  try {
    const dataUser = {
      email: data.email,
      password: data.password,
      roles: [data.roles],
    };

    const response = await axios.post('/users', dataUser);
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error de respuesta del backend:", error.response);


      if (error.response.data && error.response.data.message === "El rut ingresado posee un usuario") {
        return {
          status: error.response.status,
          data: { message: "El rut ingresado posee un usuario" }
        };
      }

      return error.response;
    } else if (error.request) {
      console.log("Error de solicitud:", error.request);
      return { status: 500, data: null, error: "No response received from server" };
    } else {
      console.log("Otro error:", error.message);
      return { status: 500, data: null, error: error.message };
    }
  }
};


export const getUsersByRole = async (role) => {
  try {
    const response = await axios.get(`/users/rol/${role}`);
    console.log('Usuarios obtenidos por rol:', response.data);
    return response.data;
  } catch (error) {
    console.log('Error al obtener usuarios por rol:', error);
    throw error;
  }
};


export const getUsers = async () => {
  try {
    const response = await axios.get('/users');
    console.log('Usuarios obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/users/${id}`);
    console.log('deleteUser response:', response);
    return response;
  } catch (error) {
    console.error('deleteUser error:', error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`/users/${id}`, data);
    console.log('updateUser response:', response);
    return response;
  } catch (error) {
    console.error('updateUser error:', error);
    throw error;
  }
};
