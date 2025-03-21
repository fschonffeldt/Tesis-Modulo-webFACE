import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { getAllReportes, darDeBajaAviso } from '../../services/avisos.service';
import { showSuccessToast, showErrorToast, showDeleteConfirm } from '../../helpers/swaHelper'; // 📌 Mensajes de alerta
import '../../styles/AvisosReportados.css';

const AvisosReportados = () => {
    const [reportes, setReportes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAvisosReportados();
    }, []);

    // 📌 Cargar reportes agrupados desde la API
    const fetchAvisosReportados = async () => {
        try {
            const data = await getAllReportes();
            setReportes(data);
        } catch (error) {
            console.error('❌ Error al obtener reportes agrupados:', error);
            showErrorToast('Error al obtener reportes.');
        } finally {
            setLoading(false);
        }
    };

    // 📌 Mostrar el estado del aviso (Activo / Desactivado / Modificado)
    const statusBodyTemplate = (rowData) => {
        const estado = rowData.aviso.estado || 'Activo';
        const severity = estado === 'Desactivado' ? 'danger' : estado === 'Modificado' ? 'warning' : 'success';
        return <Tag value={estado} severity={severity} />;
    };

    // 📌 Mostrar número de reportes con puntaje
    const totalReportesBodyTemplate = (rowData) => {
        return (
            <div style={{ fontWeight: 'bold', color: '#000' }}>
                <Tag value={rowData.totalReportes} severity="warning" /> <br />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>Puntaje: {rowData.aviso.puntosReporte || 0}</span>
            </div>
        );
    };

    // 📌 Mostrar descripción con saltos de línea y truncado opcional
    const descripcionBodyTemplate = (rowData) => {
        return (
            <div style={{ whiteSpace: 'pre-line', wordWrap: 'break-word', maxWidth: '250px', color: '#000' }}>
                {rowData.aviso.descripcion}
            </div>
        );
    };

    // 📌 Acción para dar de baja un aviso con confirmación
    const handleDarDeBaja = async (avisoId) => {
        const result = await showDeleteConfirm("¿Estás seguro de desactivar este aviso?");
        if (!result.isConfirmed) return; // Si el usuario cancela, no hacer nada

        try {
            await darDeBajaAviso(avisoId);
            showSuccessToast("🛑 Aviso desactivado correctamente.");
            fetchAvisosReportados(); // Recargar la tabla
        } catch (error) {
            console.error('❌ Error al desactivar el aviso:', error);
            showErrorToast("⚠️ Hubo un problema al desactivar el aviso.");
        }
    };

    // 📌 Filtro global
    const header = (
        <div className="header-container">
            <h1 style={{ fontWeight: 'bold', color: '#000' }}>Avisos Reportados</h1>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Buscar aviso..."
                    className="search-input"
                />
            </span>
        </div>
    );

    return (
        <div className="avisos-container">
            <DataTable
                value={reportes}
                paginator
                rows={10}
                globalFilter={globalFilter}
                loading={loading}
                header={header}
                emptyMessage="No hay avisos reportados."
                responsiveLayout="scroll"
                className="responsive-table"
            >
                <Column field="aviso.titulo" header="Título" filter filterPlaceholder="Buscar título" style={{ minWidth: '200px', fontWeight: 'bold', color: '#000' }} />
                <Column field="aviso.descripcion" header="Descripción" body={descripcionBodyTemplate} style={{ minWidth: '250px', fontWeight: 'bold', color: '#000' }} />
                <Column header="Total Reportes" body={totalReportesBodyTemplate} style={{ minWidth: '120px', textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
                <Column header="Estado" body={statusBodyTemplate} style={{ minWidth: '150px', textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <div className="action-buttons">
                            <Button
                                label="Desactivar"
                                icon="pi pi-ban"
                                className="p-button-danger p-button-sm"
                                onClick={() => handleDarDeBaja(rowData.aviso.id)} // 📌 Cambio de _id a id
                            />
                        </div>
                    )}
                    style={{ minWidth: '200px', textAlign: 'center', fontWeight: 'bold', color: '#000' }}
                />
            </DataTable>
        </div>
    );
};

export default AvisosReportados;
