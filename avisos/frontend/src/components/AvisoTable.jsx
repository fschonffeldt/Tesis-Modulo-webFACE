import React from "react";
import "../styles/AvisoTable.css";

const AvisoTable = ({ avisos, onReport, onDelete, onEdit, showActions = true }) => {
  // Template para la columna de acciones
  const actionBodyTemplate = (rowData) => (
    <div className="actions-column">
      {/* Botón Reportar */}
      <button
        className="action-button report"
        onClick={() => onReport(rowData.id)}
      >
        Reportar
      </button>

      {/* Botón Eliminar - Solo aparece si onDelete se pasa */}
      {onDelete && (
        <button
          className="action-button delete"
          onClick={() => onDelete(rowData.id)}
        >
          Eliminar
        </button>
      )}

      {/* Botón Actualizar - Solo aparece si onEdit se pasa */}
      {onEdit && (
        <button
          className="action-button edit"
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
