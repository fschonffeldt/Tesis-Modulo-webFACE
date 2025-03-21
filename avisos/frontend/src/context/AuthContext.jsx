import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState('');
  
  // 📌 Obtener el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const isAuthenticated = !!user;

  // 📌 Extraer el primer rol del array (Si el usuario tiene múltiples roles, tomará el primero)
  const userRole = user?.roles?.length > 0 ? user.roles[0].name : 'usuario';

  useEffect(() => {
    const token = cookies.get('jwt-auth');
    if (token) {
      setJwt(token);
    } else {
      navigate('/avisos-publicos');
    }
    
    if (!isAuthenticated) {
      navigate('/avisos-publicos');
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userRole }}>
      {children}
    </AuthContext.Provider>
  );
}
