import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <div className="icon-container">
                <div className="bot-container">
                  <i className="bot-icon fas fa-robot"></i>
                  <div className="glow"></div>
                </div>
                <div className="message-container">
                  <i className="message-icon fas fa-comment"></i>
                </div>
              </div>
            </div>
            <h1 className="logo-text-header">ChatFood</h1>
          </Link>
        </div>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="login-btn">
                Dashboard
              </Link>
              <button onClick={logout} className="login-btn">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/cadastro" className="signup-btn">
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
