import React, { useEffect, useState } from "react";
import { getPublicAvisos } from "../services/avisos.service";
import { useAuth } from "../context/AuthContext";

const Home = ({ showLoginSection }) => {
  const [avisos, setAvisos] = useState([]);
  const { login } = useAuth();

  useEffect(() => {
    const fetchPublicAvisos = async () => {
      const data = await getPublicAvisos();
      setAvisos(data);
    };
    fetchPublicAvisos();
  }, []);

  return (
    <div>
      <h1>Avisos Públicos</h1>
      {avisos.map((aviso) => (
        <div key={aviso.id}>
          <h3>{aviso.titulo}</h3>
          <p>{aviso.descripcion}</p>
          <p>Precio: {aviso.precio}</p>
        </div>
      ))}

      {showLoginSection && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h2>Inicia Sesión</h2>
          <button onClick={() => login({ username: "test", roles: ["user"] })}>
            Ingresar
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
