import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Importação de imagens (placeholder - devem ser substituídas por imagens reais)
// import heroImage from '../../../assets/images/hero-image.png';
// import feature1 from '../../../assets/images/feature-1.png';
// import feature2 from '../../../assets/images/feature-2.png';
// import feature3 from '../../../assets/images/feature-3.png';

const Home = () => {
  const features = [
    {
      icon: 'fas fa-comments',
      title: 'Atendimento Automático',
      description: 'Automação de atendimento com inteligência artificial que entende o contexto das conversas e responde de forma natural.'
    },
    {
      icon: 'fas fa-utensils',
      title: 'Cardápio Inteligente',
      description: 'Cardápio digital interativo que se adapta às preferências de cada cliente e otimiza o processo de pedidos.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Insights de Negócio',
      description: 'Análises e relatórios detalhados sobre seu negócio, com insights valiosos para melhorar suas vendas e operações.'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Marketing Personalizado',
      description: 'Campanhas de marketing direcionadas com base no comportamento e preferências dos clientes.'
    },
    {
      icon: 'fas fa-tasks',
      title: 'Gestão de Pedidos',
      description: 'Sistema completo para gerenciar pedidos, entregas e pagamentos em uma única plataforma.'
    },
    {
      icon: 'fas fa-users',
      title: 'Fidelização de Clientes',
      description: 'Programas de fidelidade e benefícios para atrair e manter seus clientes.'
    }
  ];

  const testimonials = [
    {
      name: 'Marcelo Silva',
      role: 'Proprietário - Pizzaria Bella Napoli',
      content: 'O ChatFood transformou o atendimento do meu restaurante. Nossos clientes adoram a agilidade nas respostas e a facilidade para fazer pedidos. Em apenas dois meses, aumentamos nossas vendas em 35%!',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Carolina Santos',
      role: 'Gerente - Hamburgueria Top Burguer',
      content: 'Reduzimos o tempo de atendimento pela metade e melhoramos a satisfação dos clientes. A ferramenta é intuitiva e nos ajudou a organizar todo o processo de pedidos. Recomendo a todos!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Ricardo Oliveira',
      role: 'Proprietário - Sushi Express',
      content: 'O sistema de cardápio inteligente aumentou o ticket médio em 20%. Além disso, a análise de dados nos ajudou a identificar quais pratos são mais populares e otimizar nosso menu.',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  ];

  return (
    <div className="home-page">
      
      {/* Seção Hero */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Automatize o atendimento do seu estabelecimento com <span className="hero-title-highlight">Inteligência Artificial</span>
            </h1>
            <p className="hero-subtitle">
              Aumente suas vendas, reduza custos e melhore a experiência dos seus clientes com o ChatFood - a solução completa para o seu negócio.
            </p>
            <div className="hero-cta">
              <Link to="/cadastro" className="primary-btn">
                <i className="fas fa-rocket"></i> Comece Grátis
              </Link>
              <p className="secondary-text">Teste grátis por 14 dias. Sem necessidade de cartão de crédito.</p>
            </div>
          </div>
          <div className="hero-image">
            {/* Placeholder para a imagem hero */}
            <div className="hero-image-placeholder">
              <i className="fas fa-mobile-alt"></i>
              <div className="chat-bubble">
                <i className="fas fa-comment-dots"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Recursos */}
      <section className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Recursos feitos para o seu sucesso</h2>
            <p>Tudo o que você precisa para transformar o atendimento do seu negócio</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Seção Como Funciona */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-title">
            <h2>Como o ChatFood funciona</h2>
            <p>Um processo simples para transformar seu atendimento</p>
          </div>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Cadastre seu negócio</h3>
              <p>Crie sua conta e configure os dados do seu estabelecimento em minutos.</p>
            </div>
            
            <div className="step-divider"></div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Personalize seu atendimento</h3>
              <p>Configure respostas automáticas, cardápios e promoções conforme sua necessidade.</p>
            </div>
            
            <div className="step-divider"></div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Aumente suas vendas</h3>
              <p>Aproveite o poder da automação e inteligência artificial para impulsionar seu negócio.</p>
            </div>
          </div>
          
          <div className="cta-container">
            <Link to="/cadastro" className="primary-btn">
              <i className="fas fa-user-plus"></i> Crie sua conta agora
            </Link>
          </div>
        </div>
      </section>
      
      {/* Seção de Depoimentos */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-title">
            <h2>O que nossos clientes dizem</h2>
            <p>Histórias de sucesso de quem já usa o ChatFood</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Seção CTA Final */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para transformar seu negócio?</h2>
            <p>Junte-se a milhares de estabelecimentos que já estão usando o ChatFood para automatizar atendimentos e aumentar suas vendas.</p>
            <div className="cta-buttons">
              <Link to="/cadastro" className="primary-btn">
                <i className="fas fa-rocket"></i> Comece Grátis
              </Link>
              <Link to="/demonstracao" className="btn-outline">
                <i className="fas fa-headset"></i> Fale com um Consultor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
