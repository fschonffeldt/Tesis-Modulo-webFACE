import React, { useEffect, useState } from "react";
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
        const data = await getAvisos();
        
        // 🔴 Filtrar avisos desactivados o vencidos
        const avisosActivos = data.filter(aviso => aviso.estado !== 'Desactivado' && aviso.estado !== 'Vencido');
        
        setAvisos(avisosActivos);
        setIsUserAuthenticated(!!localStorage.getItem('user')); // Verificar autenticación
      } catch (error) {
        console.error('Error al cargar los avisos:', error);
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
      {/* Encabezado con título y botón alineado a la derecha */}
      <div className="row mb-4">
        <div className="col-md-8">
        </div>
        <div className="col-md-4 text-md-end">

        </div>
      </div>

      {/* Tabla de avisos públicos */}
      <div className="listar-avisos-container">
        <AvisoTable avisos={avisos} showActions={false} />
      </div>
    </div>
  );
};

export default AvisosPublicos;
