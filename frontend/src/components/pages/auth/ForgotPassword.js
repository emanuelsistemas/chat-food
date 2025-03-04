import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import { authService } from '../../../services/auth.service';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      // Esta funcionalidade será implementada no futuro
      // Atualmente apenas simula o envio do e-mail
      // await authService.forgotPassword(email);
      
      // Simulação de sucesso
      setTimeout(() => {
        setMessage('Se o e-mail estiver cadastrado, enviaremos instruções para redefinir sua senha.');
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${theme}`}>
      <div className="auth-card">
        <h2>Recuperar Senha</h2>
        <p>Enviaremos instruções para o seu e-mail</p>
        
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail cadastrado"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Enviar Instruções'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            <Link to="/login">Voltar para o login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
