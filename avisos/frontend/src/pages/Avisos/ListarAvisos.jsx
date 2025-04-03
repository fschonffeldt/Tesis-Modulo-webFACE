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
  const [tagFilter, setTagFilter] = useState(""); // 🆕 Filtro por tag

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getAvisos();

        const avisosActivos = data.filter(
          (aviso) => aviso.estado !== "Desactivado" && aviso.estado !== "Vencido"
        );

        setAvisos(avisosActivos);
        setFilteredAvisos(avisosActivos);

        const categoriasPredefinidas = ["Educación", "Venta", "Compra", "Habitacional", "Otros"];
        const categoriasAvisos = [
          ...new Set(avisosActivos.map((aviso) => aviso.categoria?.trim().toLowerCase())),
        ];
        const categoriasFinal = [
          ...new Set([...categoriasPredefinidas.map((cat) => cat.toLowerCase()), ...categoriasAvisos]),
        ];
        const categoriasNormalizadas = categoriasFinal.map((cat) => ({
          label: cat.charAt(0).toUpperCase() + cat.slice(1),
          value: cat.charAt(0).toUpperCase() + cat.slice(1),
        }));

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
      avisosFiltrados = avisosFiltrados.filter(
        (aviso) => aviso.categoria?.toLowerCase() === selectedCategoria.toLowerCase()
      );
    }

    if (globalFilter) {
      const lowerCaseFilter = globalFilter.toLowerCase();
      avisosFiltrados = avisosFiltrados.filter(
        (aviso) =>
          aviso.titulo.toLowerCase().includes(lowerCaseFilter) ||
          aviso.descripcion.toLowerCase().includes(lowerCaseFilter)
      );
    }

    if (tagFilter.trim() !== "") {
      const tag = tagFilter.toLowerCase();
      avisosFiltrados = avisosFiltrados.filter((aviso) =>
        aviso.tags?.some((t) => t.toLowerCase().includes(tag))
      );
    }

    setFilteredAvisos(avisosFiltrados);
  }, [globalFilter, selectedCategoria, tagFilter, avisos]);

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
    if (e && e.preventDefault) e.preventDefault();

    try {
      const usuario = localStorage.getItem("user");
      const response = await reportAviso(
        avisoId,
        usuario,
        formData.gravedad,
        formData.comentario
      );

      alert(response.message || "Reporte registrado con éxito.");
      closeReportModal();
    } catch (error) {
      console.error("Error al reportar el aviso:", error);
      alert("Hubo un problema al reportar el aviso. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <div className="listar-avisos-container">
      {/* 🔍 Filtros */}
      <div
        className="filters-container"
        style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "160px" }}
      >
        {/* Buscador */}
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


        {/* 🆕 Tag */}
        <span className="p-input-icon-left">
          <i className="pi pi-tags" style={{ paddingLeft: "10px", fontSize: "1.2rem" }} />
          <InputText
            type="text"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="Filtrar por tag"
            style={{ paddingLeft: "35px", height: "40px", fontSize: "16px", width: "250px" }}
          />
        </span>
      </div>

      {/* Tabla de avisos */}
      <div className="avisos-table-container">
        <AvisoTable
          avisos={filteredAvisos}
          onReport={openReportModal}
          showDelete={false}
          showUpdate={false}
          showReport={true}
        />
      </div>

      {/* Modal para reportar */}
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
