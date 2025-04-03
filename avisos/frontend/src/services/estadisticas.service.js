import axios from './root.service'; // Usa tu config base de Axios

export const getPublicadoresPorMes = async (mes, anio) => {
  const response = await axios.get(`/estadisticas/top-publicadores-mes?mes=${mes}&anio=${anio}`);
  return response.data;
};

export const getReportadoresPorMes = async (mes, anio) => {
  const response = await axios.get(`/estadisticas/top-reportadores-mes?mes=${mes}&anio=${anio}`);
  return response.data;
};

export const getTopTagsMes = async () => {
  const response = await axios.get('/estadisticas/top-tags-mes');
  return response.data;
};