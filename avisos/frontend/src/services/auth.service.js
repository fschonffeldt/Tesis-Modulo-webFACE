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
 * Envía el código de activación al correo del usuario
 * @param {String} email - Correo del usuario
 * @returns {Object} Respuesta del backend
 */
export const sendActivationCode = async (email) => {
  try {
    // Llamada al endpoint del backend
    const response = await axios.post('/users/send-verification', { email });
    const { status, data } = response;

    if (status === 200) {
      console.log('Código de activación enviado:', data);
      return data; // Devuelve el mensaje de éxito del backend
    }
  } catch (error) {
    console.error('Error enviando el código de activación:', error.response?.data || error.message);
    throw error; // Lanza el error para manejarlo en el componente o flujo
  }
};

/**
 * Activa la cuenta del usuario
 * @param {String} email - Correo del usuario
 * @param {String} code - Código de activación enviado por correo
 * @returns {Object} Respuesta del backend
 */
export const activateAccount = async ({ email, code }) => {
  try {
    const response = await axios.post('/users/activate', { email, code }); // Llama a la ruta del backend
    const { status, data } = response;
    if (status === 200) {
      console.log('Cuenta activada exitosamente:', data);
      return data;
    }
  } catch (error) {
    console.error('Error activando la cuenta:', error.response?.data || error.message);
    throw error; // Lanza el error para manejarlo en el componente
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
