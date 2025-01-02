import React, { useEffect, useState } from 'react';
import { getAvisos, reportAviso } from '../../services/avisos.service';
import AvisoTable from '../../components/AvisoTable';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('user');

const ListarAvisos = () => {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const fetchAvisos = async () => {
    try {
      const data = isAuthenticated() ? await getAvisos() : [];
      setAvisos(data);
    } catch (error) {
      console.error('Error al cargar los avisos:', error);
    }
  };

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated());
    fetchAvisos();
  }, []);

  const handleReport = async (id) => {
    if (!isUserAuthenticated) {
      alert("Debes iniciar sesión para reportar avisos.");
      return;
    }
  
    try {
      const usuario = localStorage.getItem("user"); // Usuario autenticado
      const gravedad = prompt("Selecciona la gravedad del reporte: Leve, Media, Alta");
  
      debugger; // Pausa la ejecución aquí
      console.log("Datos enviados al servicio:", { id, usuario, gravedad });
  
      if (!["Leve", "Media", "Alta"].includes(gravedad)) {
        alert("Gravedad inválida.");
        return;
      }
  
      const response = await reportAviso(id, usuario, gravedad);
      console.log("Respuesta del backend:", response);
      alert(response.message || "Reporte registrado con éxito.");
    } catch (error) {
      console.error("Error al reportar el aviso:", error);
      alert("Hubo un problema al reportar el aviso.");
    }
  };
  
  return (
    <div className="listar-avisos-container">
      <h1 className="listar-avisos-title">{isUserAuthenticated ? 'Avisos' : 'Avisos Públicos'}</h1>
      <div className="avisos-table-container">
        <AvisoTable
          avisos={avisos}
          onReport={handleReport} // Pasamos la función como prop
        />
      </div>
    </div>
  );
};

export default ListarAvisos;
