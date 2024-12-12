import React from 'react';
import '../styles/AvisoTable.css'; // Importa el archivo CSS

const AvisoTable = ({ avisos, onDelete, onReport }) => {
  return (
    <div className="listar-avisos-container">
      <h1> Avisos</h1>
      <table className="avisos-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {avisos ? (
            avisos.map((aviso) => (
              <tr key={aviso.id}>
                <td>{aviso.titulo}</td>
                <td>{aviso.descripcion}</td>
                <td>${aviso.precio}</td>
                <td className="actions-column">
                  <button
                    className="action-button delete"
                    onClick={() => onDelete(aviso.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="action-button report"
                    onClick={() => onReport(aviso.id)}
                  >
                    Reportar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay avisos para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvisoTable;
