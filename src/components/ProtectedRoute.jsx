import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Enquanto verifica o estado da autenticação, não faz nada
  if (loading) {
    return null;
  }

  // Se não há usuário autenticado, redireciona para o login
  // guardando a localização atual para redirect posterior
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;