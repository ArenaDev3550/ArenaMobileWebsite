// API Authentication Service
//
// Este arquivo contém a configuração para conectar com a API de autenticação.
//
// API Base URL: http://localhost:8000
//
// Endpoints disponíveis:
// - POST /login - Faz login com {username, password}
//   Retorna: {token: "bearer_token", user: {...}}
//
// - GET /verify-token - Verifica se o token é válido
//   Headers: Authorization: Bearer {token}
//
// - POST /logout - Faz logout
//   Headers: Authorization: Bearer {token}
//
// Como usar:
// import { useAuth } from '../contexts/AuthContext';
//
// const { login, logout, getToken, user, loading, error } = useAuth();
//
// // Fazer login
// await login('username', 'password');
//
// // Obter token atual
// const token = getToken();
//
// // Fazer logout
// logout();