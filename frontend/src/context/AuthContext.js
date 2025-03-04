import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Exportando o contexto diretamente
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se o usuário já está logado ao carregar a aplicação
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Se não houver token, não está logado
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Configurar o token nos headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        // Buscar o perfil do usuário
        const res = await axios.get('/api/users/profile', config);
        
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          // Em caso de erro, limpar o localStorage
          localStorage.removeItem('token');
        }
      } catch (err) {
        // Em caso de erro, limpar o localStorage
        localStorage.removeItem('token');
        console.error('Erro ao verificar autenticação:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Função para login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/login', { email, password });
      
      if (res.data.success) {
        // Salvar o token no localStorage
        localStorage.setItem('token', res.data.token);
        
        // Atualizar o estado do usuário
        setUser(res.data.data);
        
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Erro ao fazer login. Verifique suas credenciais.'
      );
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erro ao fazer login' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Função para registro
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/register', userData);
      
      if (res.data.success) {
        // Salvar o token no localStorage
        localStorage.setItem('token', res.data.token);
        
        // Atualizar o estado do usuário
        setUser(res.data.data);
        
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Erro ao fazer cadastro. Verifique os dados informados.'
      );
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erro ao fazer cadastro' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = () => {
    // Remover o token do localStorage
    localStorage.removeItem('token');
    
    // Atualizar o estado do usuário
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
