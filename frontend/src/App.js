import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Contexto
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';

// Componentes de páginas
import Home from './components/pages/home/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import ForgotPassword from './components/pages/auth/ForgotPassword';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Estilo global
import './assets/styles/App.css';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }
  
  // Redirecionar para o login se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const { theme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <Header />
      <main className="main-content">
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Rotas protegidas (a serem implementadas) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div>Dashboard (Em construção)</div>
            </ProtectedRoute>
          } />
          
          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
// Simulando uma alteração no código
