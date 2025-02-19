import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { getAllReportes, darDeBajaAviso, actualizarAvisoReportado } from '../../services/avisos.service';
import '../../styles/AvisosReportados.css';

const AvisosReportados = () => {
    const [reportes, setReportes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAvisosReportados();
    }, []);

    // Cargar reportes agrupados desde la API
    const fetchAvisosReportados = async () => {
        try {
            const data = await getAllReportes();
            setReportes(data);
        } catch (error) {
            console.error('Error al obtener reportes agrupados:', error);
        } finally {
            setLoading(false);
        }
    };

    // Mostrar el estado del aviso (Activo / Desactivado / Modificado)
    const statusBodyTemplate = (rowData) => {
        const estado = rowData.aviso.estado || 'Activo';
        const severity = estado === 'Desactivado' ? 'danger' : estado === 'Modificado' ? 'warning' : 'success';
        return <Tag value={estado} severity={severity} />;
    };

    // Mostrar número de reportes
    const totalReportesBodyTemplate = (rowData) => {
        return <Tag value={rowData.totalReportes} severity="warning" />;
    };

    // Acción de dar de baja un aviso
    const handleDarDeBaja = async (avisoId) => {
        try {
            await darDeBajaAviso(avisoId);
            fetchAvisosReportados();
        } catch (error) {
            console.error('Error al dar de baja el aviso:', error);
        }
    };

    // Acción de modificar un aviso
    const handleActualizarAviso = async (avisoId) => {
        try {
            await actualizarAvisoReportado(avisoId, { estado: 'Modificado' });
            fetchAvisosReportados();
        } catch (error) {
            console.error('Error al actualizar el aviso:', error);
        }
    };

    // Filtro global
    const header = (
        <div className="header-container">
            <h1>Avisos Reportados</h1>
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
                <Column field="aviso.titulo" header="Título" filter filterPlaceholder="Buscar título" style={{ minWidth: '250px' }} />
                <Column field="aviso.descripcion" header="Descripción" style={{ minWidth: '300px' }} />
                <Column header="Total Reportes" body={totalReportesBodyTemplate} style={{ minWidth: '120px', textAlign: 'center' }} />
                <Column header="Estado" body={statusBodyTemplate} style={{ minWidth: '150px', textAlign: 'center' }} />
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <div className="action-buttons">
                            <Button
                                label="Desactivar"
                                icon="pi pi-ban"
                                className="p-button-danger p-button-sm"
                                onClick={() => handleDarDeBaja(rowData.aviso._id)}
                            />
                            <Button
                                label="Modificar"
                                icon="pi pi-pencil"
                                className="p-button-warning p-button-sm"
                                onClick={() => handleActualizarAviso(rowData.aviso._id)}
                                style={{ marginLeft: '10px' }}
                            />
                        </div>
                    )}
                    style={{ minWidth: '200px', textAlign: 'center' }}
                />
            </DataTable>
        </div>
    );
};

export default AvisosReportados;
