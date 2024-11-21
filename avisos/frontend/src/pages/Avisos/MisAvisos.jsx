import React, { useEffect, useState } from 'react';
import AvisoTable from '../../components/AvisoTable'; // Tabla reutilizable para mostrar avisos
import { getAvisosByUsuario } from '../../services/avisos.service'; // Importar la función del servicio

const MisAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisosByUsuario();
        setAvisos(data);
      } catch (error) {
        setError('No se pudieron cargar los avisos. Intenta nuevamente.');
      }
    };

    fetchAvisos();
  }, []);

  return (
    <div className="listar-avisos-container">
      <h1>Mis Avisos</h1>
      {error ? (
        <div className="error-message">{error}</div>
      ) : avisos.length === 0 ? (
        <p>No tienes avisos publicados.</p>
      ) : (
        <table className="avisos-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {avisos.map((aviso) => (
              <tr key={aviso._id}>
                <td>{aviso.titulo}</td>
                <td>{aviso.descripcion}</td>
                <td>${aviso.precio}</td>
                <td>{aviso.categoria}</td>
                <td className="actions-column">
                  <button
                    className="action-button delete"
                    onClick={() => handleDelete(aviso._id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="action-button report"
                    onClick={() => handleReport(aviso._id)}
                  >
                    Reportar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  // Funciones para las acciones
  const handleDelete = async (id) => {
    try {
      // Lógica para eliminar aviso
      console.log(`Eliminar aviso con ID: ${id}`);
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
    }
  };

  const handleReport = async (id) => {
    try {
      // Lógica para reportar aviso
      console.log(`Reportar aviso con ID: ${id}`);
    } catch (error) {
      console.error('Error al reportar el aviso:', error);
    }
  };
};

export default MisAvisos;