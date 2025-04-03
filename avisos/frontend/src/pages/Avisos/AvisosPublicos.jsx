import React, { useEffect, useState } from "react";
import { getPublicAvisos } from "../../services/avisos.service";
import AvisoTable from "../../components/AvisoTablePublico"; // Tabla sin contacto ni botones
import { InputText } from "primereact/inputtext";
import "../../styles/AvisosGlobal.css";

const AvisosPublicos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filteredAvisos, setFilteredAvisos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getPublicAvisos();
        const avisosActivos = data.filter(aviso => aviso.estado !== "Desactivado" && aviso.estado !== "Vencido");

        setAvisos(avisosActivos);
        setFilteredAvisos(avisosActivos);
      } catch (error) {
        console.error("Error al cargar los avisos públicos:", error);
      }
    };

    fetchAvisos();
  }, []);

  // 🔍 Filtrar por texto y tags
  useEffect(() => {
    let resultado = avisos;

    // Filtro por texto (título o descripción)
    if (globalFilter) {
      const lowerCaseFilter = globalFilter.toLowerCase();
      resultado = resultado.filter(aviso =>
        aviso.titulo.toLowerCase().includes(lowerCaseFilter) ||
        aviso.descripcion.toLowerCase().includes(lowerCaseFilter)
      );
    }

    // Filtro por tag
    if (tagFilter) {
      const lowerTag = tagFilter.toLowerCase();
      resultado = resultado.filter(aviso =>
        aviso.tags?.some(tag => tag.toLowerCase().includes(lowerTag))
      );
    }

    setFilteredAvisos(resultado);
  }, [globalFilter, tagFilter, avisos]);

  return (
    <div className="listar-avisos-container">
      {/* 🔍 Filtros combinados */}
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

      {/* Tabla de avisos públicos */}
      <div className="avisos-table-container">
        <AvisoTable avisos={filteredAvisos} />
      </div>
    </div>
  );
};

export default AvisosPublicos;
