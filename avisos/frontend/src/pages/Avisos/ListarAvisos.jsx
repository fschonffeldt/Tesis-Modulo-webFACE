import React, { useEffect, useState } from "react";
import { getAvisos, reportAviso } from "../../services/avisos.service";
import AvisoTable from "../../components/AvisoTable";
import ReportModal from "../../components/ReporteModal";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "../../styles/AvisosGlobal.css";

const ListarAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filteredAvisos, setFilteredAvisos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedAviso, setSelectedAviso] = useState(null);
  const [gravedad, setGravedad] = useState("Leve");
  const [comentario, setComentario] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisos();

        const avisosActivos = data.filter(aviso => aviso.estado !== "Desactivado" && aviso.estado !== "Vencido");

        setAvisos(avisosActivos);
        setFilteredAvisos(avisosActivos);

        // 📌 Categorías predefinidas en minúsculas
        const categoriasPredefinidas = ["Educación", "Venta", "Compra", "Habitacional", "Otros"];

        // 📌 Obtener categorías únicas desde los avisos, normalizando mayúsculas/minúsculas
        const categoriasAvisos = [...new Set(avisosActivos.map(aviso => aviso.categoria.trim().toLowerCase()))];

        // 📌 Fusionar categorías predefinidas y dinámicas sin duplicados
        const categoriasFinal = [...new Set([...categoriasPredefinidas.map(cat => cat.toLowerCase()), ...categoriasAvisos])];

        // 📌 Convertir la primera letra en mayúscula para uniformidad
        const categoriasNormalizadas = categoriasFinal.map(cat => ({
          label: cat.charAt(0).toUpperCase() + cat.slice(1),
          value: cat.charAt(0).toUpperCase() + cat.slice(1),
        }));

        // 📌 Agregar opción para ver todos los avisos con `null` manejado correctamente
        setCategorias([{ label: "Todas las categorías", value: "Todas" }, ...categoriasNormalizadas]);
      } catch (error) {
        console.error("Error al cargar los avisos:", error);
      }
    };

    fetchAvisos();
  }, []);

  useEffect(() => {
    let avisosFiltrados = avisos;

    if (selectedCategoria && selectedCategoria !== "Todas") {
      avisosFiltrados = avisos.filter(aviso => aviso.categoria.toLowerCase() === selectedCategoria.toLowerCase());
    }

    if (globalFilter) {
      const lowerCaseFilter = globalFilter.toLowerCase();
      avisosFiltrados = avisosFiltrados.filter(aviso =>
        aviso.titulo.toLowerCase().includes(lowerCaseFilter) || 
        aviso.descripcion.toLowerCase().includes(lowerCaseFilter)
      );
    }

    setFilteredAvisos(avisosFiltrados);
  }, [globalFilter, selectedCategoria, avisos]);

  const openReportModal = (aviso) => {
    setSelectedAviso(aviso);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedAviso(null);
    setGravedad("Leve");
    setComentario("");
  };

  const handleReport = async (e, avisoId, formData) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      const usuario = localStorage.getItem("user");
      const response = await reportAviso(avisoId, usuario, formData.gravedad, formData.comentario);

      alert(response.message || "Reporte registrado con éxito.");
      closeReportModal();
    } catch (error) {
      console.error("Error al reportar el aviso:", error);
      alert("Hubo un problema al reportar el aviso. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <div className="listar-avisos-container">
      
      {/* 🔍 Barra de búsqueda y filtro de categoría */}
      <div className="filters-container" style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "160px" }}>
        {/* Campo de búsqueda */}
        <span className="p-input-icon-left">
          <i className="pi pi-search" style={{ paddingLeft: "10px", fontSize: "1.2rem" }} />
          <InputText
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar aviso"
            className="search-input"
            style={{ paddingLeft: "35px", height: "40px", fontSize: "16px" }}
          />
        </span>

        {/* 📌 Filtro por categoría */}
        <Dropdown
          value={selectedCategoria}
          options={categorias}
          onChange={(e) => setSelectedCategoria(e.value)}
          placeholder="Seleccione una categoría"
          className="p-dropdown"
          style={{ width: "250px", height: "40px",borderRadius: '5px'  }}
        />
      </div>

      <div className="avisos-table-container">
        <AvisoTable
          avisos={filteredAvisos}
          onReport={openReportModal}
          showDelete={false}
          showUpdate={false}
          showReport={true}
        />
      </div>

      {/* Modal para reportar aviso */}
      {isReportModalOpen && (
        <ReportModal
          aviso={selectedAviso}
          onClose={closeReportModal}
          onSubmit={handleReport}
          title="Reportar Aviso"
          gravedad={gravedad}
          setGravedad={setGravedad}
          comentario={comentario}
          setComentario={setComentario}
        />
      )}
    </div>
  );
};

export default ListarAvisos;
