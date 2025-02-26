import React, { useEffect, useState } from "react";
import { getPublicAvisos } from "../../services/avisos.service";
import AvisoTable from "../../components/AvisoTablePublico";
import { useNavigate } from "react-router-dom";
import "../../styles/AvisoTable.css"; // Importa los estilos de la tabla

const AvisosPublicos = () => {
  const [avisos, setAvisos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const data = await getPublicAvisos();

        // 🔹 Filtrar avisos activos (Excluir desactivados y vencidos)
        const avisosActivos = data.filter(aviso => aviso.estado !== "Desactivado" && aviso.estado !== "Vencido");

        // 🔹 Orden personalizado de categorías
        const categoriasOrdenadas = ["Compra/Venta", "Habitacional", "Tecnología", "Clases/Ayudantías", "Otros"];

        // 🔹 Función de comparación personalizada
        const avisosOrdenados = avisosActivos.sort((a, b) => {
          return categoriasOrdenadas.indexOf(a.categoria) - categoriasOrdenadas.indexOf(b.categoria);
        });

        setAvisos(avisosOrdenados);
      } catch (err) {
        console.error("Error al cargar los avisos públicos:", err);
        setError("Error al cargar los avisos públicos.");
      }
    };

    fetchAvisos();
  }, []);

  const handleLogin = () => {
    navigate("/auth");
  };

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
        </div>
        <div className="col-md-4 text-md-end">
        </div>
      </div>

      <div className="listar-avisos-container">
        <AvisoTable avisos={avisos} showActions={false} />
      </div>
    </div>
  );
};

export default AvisosPublicos;
