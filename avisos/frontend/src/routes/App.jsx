import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../styles/App.css'; // Importa los estilos CSS
import CrearAviso from '../pages/Avisos/CrearAviso';
import EditarAviso from '../pages/Avisos/EditarAviso';
import ListarAviso from '../pages/Avisos/ListarAvisos';
import MisAvisos from '../pages/Avisos/MisAvisos';
import AvisosPublicos from "../pages/Avisos/AvisosPublicos"; 
import ReportarAviso from '../pages/Avisos/ReportarAvisos';

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <img
          src="/UB.jpg"
          alt="Universidad del Bío-Bío"
          className="header-image"
        />
        <h1 className="header-title"></h1>
      </div>

      {/* Configuración de rutas */}
      <BrowserRouter>
        <Routes>
          <Route path="/listar-avisos" element={<ListarAviso />} />
          <Route path="/crear-aviso" element={<CrearAviso />} />
          <Route path="/editar-aviso/:id" element={<EditarAviso />} />
          <Route path="/mis-avisos" element={<MisAvisos />} />
          <Route path="/avisos-publicos" element={<AvisosPublicos />} />
          <Route path="/reportar-aviso/:id" element={<ReportarAviso />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
