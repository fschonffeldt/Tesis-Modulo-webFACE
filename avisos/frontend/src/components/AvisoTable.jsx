import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/AvisoTable.css";

const AvisoTable = ({ avisos, onDelete, onEdit, showActions = true }) => {
  const actionBodyTemplate = (rowData) => (
    <div className="actions-column">
      <Link to={`/reportar-aviso/${rowData.id}`}>
        <button className="action-button report">Reportar</button>
      </Link>
      {onDelete && (
        <button
          className="action-button eliminar"
          onClick={() => onDelete(rowData.id)}
        >
          Eliminar
        </button>
      )}
      {onEdit && (
        <button
          className="action-button editar"
          onClick={() => onEdit(rowData)}
        >
          Actualizar
        </button>
      )}
    </div>
  );

  return (
    <div className="avisos-table-container">
      <table className="avisos-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            {showActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {avisos.length > 0 ? (
            avisos.map((aviso) => (
              <tr key={aviso.id}>
                <td>{aviso.titulo}</td>
                <td>{aviso.descripcion}</td>
                <td>${aviso.precio || "N/A"}</td>
                <td>{aviso.categoria || "Sin categoría"}</td>
                {showActions && <td>{actionBodyTemplate(aviso)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay avisos para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvisoTable;
