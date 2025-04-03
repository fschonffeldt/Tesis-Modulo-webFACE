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
import Estadisticas from './pages/Avisos/Estadisticas.jsx'; // ✅ NUEVO

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
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
        element: <ReportarAviso />,
      },
      {
        path: '/avisos-reportados',
        element: <AvisosReportados />,
      },
      {
        path: '/estadisticas', // ✅ NUEVA RUTA PARA GRÁFICOS
        element: <Estadisticas />,
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
