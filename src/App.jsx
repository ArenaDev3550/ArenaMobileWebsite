import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Academico from "./pages/academico/Academico";
import Agendamentos from "./pages/agendamentos/Agendamentos";
import Configuracoes from "./pages/configuracoes/Configuracoes";
import AlterarSenha from "./pages/alterarSenha/AlterarSenha";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Routes>
        {/* Rotas Públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Rotas Protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/academico" element={<Academico />} />
                  <Route path="/agendamentos" element={<Agendamentos />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                  <Route path="/alterar-senha" element={<AlterarSenha />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;