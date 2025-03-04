import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="icon-container-footer">
              <div className="bot-container-footer">
                <i className="bot-icon fas fa-robot"></i>
                <div className="glow-footer"></div>
              </div>
              <div className="message-container-footer">
                <i className="message-icon fas fa-comment"></i>
              </div>
            </div>
            <h2 className="logo-text-footer">ChatFood</h2>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Produto</h3>
              <ul>
                <li><Link to="/">Início</Link></li>
                <li><Link to="/recursos">Recursos</Link></li>
                <li><Link to="/precos">Preços</Link></li>
                <li><Link to="/demonstracao">Demonstração</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Empresa</h3>
              <ul>
                <li><Link to="/sobre">Sobre nós</Link></li>
                <li><Link to="/contato">Contato</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/carreiras">Carreiras</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Suporte</h3>
              <ul>
                <li><Link to="/ajuda">Central de Ajuda</Link></li>
                <li><Link to="/documentacao">Documentação</Link></li>
                <li><Link to="/status">Status</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/termos">Termos de Uso</Link></li>
                <li><Link to="/privacidade">Política de Privacidade</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} ChatFood. Todos os direitos reservados.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
