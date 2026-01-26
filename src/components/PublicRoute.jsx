import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Se o usuário está autenticado e tenta acessar uma rota pública,
  // redireciona para a página inicial
  if (user) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};

export default PublicRoute;