import api from './api';

// Serviço para operações relacionadas à autenticação
const AuthService = {
  // Registro de novo usuário
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Se o registro for bem-sucedido, salvar o token
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  // Login de usuário
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Se o login for bem-sucedido, salvar o token
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  // Logout de usuário
  logout: () => {
    localStorage.removeItem('token');
  },
  
  // Verificar se o usuário está logado
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
  
  // Obter o token atual
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Obter o perfil do usuário atual
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default AuthService;
