import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

/**
 * Inicia sesión con un usuario
 * @param {Object} credentials - Contiene email y password
 * @returns {Object} Respuesta del backend
 */
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });
    const { status, data } = response;
    if (status === 200) {
      const { email, roles } = await jwtDecode(data.data.accessToken);
      localStorage.setItem('user', JSON.stringify({ email, roles }));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.accessToken}`;
      cookies.set('jwt-auth', data.data.accessToken, { path: '/' });
      return data;
    } else {
      throw new Error('Login fallido');
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Cierra sesión del usuario
 */
export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  cookies.remove('jwt-auth');
};

/**
 * Prueba de autenticación
 */
export const test = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};


/**
 * Registra un nuevo usuario
 * @param {String} email - Correo del usuario
 * @returns {Object} Respuesta del backend
 */
export const register = async (email) => {
  try {
    const response = await axios.post('/auth/register', { email });
    const { status, data } = response;
    if (status === 201) {
      console.log('Registro exitoso:', data);
      return data;
    }
  } catch (error) {
    console.error('Error en el registro:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Restablece la contraseña de un usuario
 * @param {String} email - Correo electrónico del usuario
 * @returns {Object} Respuesta del backend
 */
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post('/auth/forgot-password', { email });
    const { status, data } = response;
    if (status === 200) {
      console.log('Restablecimiento de contraseña exitoso:', data);
      return data;
    }
  } catch (error) {
    console.error('Error en el restablecimiento de contraseña:', error.response?.data || error.message);
    throw error;
  }
};
