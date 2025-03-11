import React, { useEffect, useState } from "react";
import { getPublicAvisos } from "../../services/avisos.service";
import AvisoTable from "../../components/AvisoTablePublico"; // Usar una tabla sin contacto ni botones
import { InputText } from "primereact/inputtext";
import "../../styles/AvisosGlobal.css";

const AvisosPublicos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filteredAvisos, setFilteredAvisos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getPublicAvisos();

        // 🔹 Filtrar avisos activos (Excluir desactivados y vencidos)
        const avisosActivos = data.filter(aviso => aviso.estado !== "Desactivado" && aviso.estado !== "Vencido");

        setAvisos(avisosActivos);
        setFilteredAvisos(avisosActivos);
      } catch (error) {
        console.error("Error al cargar los avisos públicos:", error);
      }
    };

    fetchAvisos();
  }, []);

  // 📌 Función para filtrar avisos según el texto ingresado
  useEffect(() => {
    if (!globalFilter) {
      setFilteredAvisos(avisos); // Si no hay búsqueda, mostrar todos los avisos
    } else {
      const lowerCaseFilter = globalFilter.toLowerCase();
      const filtered = avisos.filter(aviso =>
        aviso.titulo.toLowerCase().includes(lowerCaseFilter) ||
        aviso.descripcion.toLowerCase().includes(lowerCaseFilter)
      );
      setFilteredAvisos(filtered);
    }
  }, [globalFilter, avisos]);

  return (
    <div className="listar-avisos-container">
      
      {/* 🔍 Barra de búsqueda */}
      <div className="search-container" style={{ marginLeft: "160px" }}>
        <span className="p-input-icon-left" style={{ display: "flex", alignItems: "center" }}>
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
      </div>

      {/* 📌 Tabla de avisos públicos (sin datos de contacto y sin botones de acción) */}
      <div className="avisos-table-container">
        <AvisoTable avisos={filteredAvisos} />
      </div>
    </div>
  );
};

export default AvisosPublicos;
