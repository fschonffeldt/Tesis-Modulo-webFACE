import React from 'react';
import "../styles/AvisoTable.css";

const AvisoTable = ({ avisos, onDelete, onEdit, onReport, onRowClick, showActions = true, showReport = true }) => {
  const actionBodyTemplate = (rowData) => (
    <div className="actions-column">
      {showReport && (
        <button 
          className="action-button report"
          onClick={(e) => {
            e.stopPropagation(); // Evitar conflicto con el clic en la fila
            onReport(rowData);
          }}
        >
          Reportar
        </button>
      )}
      {onDelete && (
        <button
          className="action-button eliminar"
          onClick={(e) => {
            e.stopPropagation(); // Evitar conflicto con el clic en la fila
            onDelete(rowData.id);
          }}
        >
          Eliminar
        </button>
      )}
      {onEdit && (
        <button
          className="action-button editar"
          onClick={(e) => {
            e.stopPropagation(); // Evitar conflicto con el clic en la fila
            onEdit(rowData);
          }}
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
            <th>Categoría</th>
            {showActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {avisos.length > 0 ? (
            avisos.map((aviso) => (
              <tr key={aviso.id} onClick={() => onRowClick(aviso)} style={{ cursor: 'pointer' }}>
                <td>{aviso.titulo}</td>
                <td>{aviso.descripcion}</td>
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
