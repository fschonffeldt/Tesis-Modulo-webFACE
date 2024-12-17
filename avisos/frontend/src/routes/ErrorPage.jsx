import { useRouteError } from 'react-router-dom';
import '../styles/notFound.css'; // Archivo CSS específico para esta página

const ErrorPage = () => {
  const error = useRouteError();

  console.error({
    status: error?.status || 'Unknown',
    statusText: error?.statusText || 'Unknown error',
    message: error?.message || 'No message',
  });

  return (
    <div className="error-page-container">
      <div className="error-content">
        {/* Imagen de error */}
        <div className="error-image">
          <img
            alt="Página no encontrada"
            width={300}
            height={300}
          />
        </div>

        {/* Mensaje principal */}
        <h1 className="error-title">Oops, página no encontrada</h1>
        <p className="error-description">
          Lo sentimos, pero la página que buscas no existe. Regresa a la página principal para seguir explorando.
        </p>

        {/* Botón de regreso */}
        <div className="error-actions">
          <a
            href="/avisos-publicos" 
            className="error-button"
          >
            Volver a la página principal
          </a>
        </div>

        {/* Contacto o créditos */}
        <div className="error-footer">
          
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
