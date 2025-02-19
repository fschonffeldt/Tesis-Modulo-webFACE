import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import ListarAvisos from './pages/Avisos/ListarAvisos';
import CrearAviso from './pages/Avisos/CrearAviso';
import EditarAviso from './pages/Avisos/EditarAviso';
import MisAvisos from './pages/Avisos/MisAvisos';
import AvisosPublicos from './pages/Avisos/AvisosPublicos.jsx';
import ReportarAviso from './pages/Avisos/ReportarAvisos.jsx';
import AvisosReportados from './pages/Avisos/AvisosReportados.jsx';


const router = createBrowserRouter([
  {
    path: '/', // Ruta raíz
    element: <Root />, // Componente raíz
    errorElement: <ErrorPage />, // Página para manejar errores
    children: [
      {
        path: '/',
        element: <App />,
      },
      // Rutas del CRUD de Avisos
      {
        path: '/crear-aviso',
        element: <CrearAviso />,
      },
      {
        path: '/editar-aviso/:id',
        element: <EditarAviso />,
      },
      {
        path: '/mis-avisos',
        element: <MisAvisos />,
      },
      {
        path: '/listar-avisos',
        element: <ListarAvisos />,
      },
      {
        path: '/avisos-publicos',
        element: <AvisosPublicos />,
      },
      {
        path: '/reportar-aviso/:id',
        element: <ReportarAviso  />,
      },
      {
        path: '/avisos-reportados', // 🔹 Agregamos la nueva ruta
        element: <AvisosReportados />,
      },
    ],
  },
  
  {
    path: '/auth',
    element: <Login />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);