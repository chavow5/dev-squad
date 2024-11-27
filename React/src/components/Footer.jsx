// import React from 'react'; //version +17  npm list react     

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <center>
      <p className="footer-text"> 2024 ViaPass - Todos los derechos reservados.</p>
      
      {/* links de navegacion header */}
      <nav className="footer-nav">
        <ul className="footer-links">
          <li><a href="/" className="footer-link">Inicio</a></li>
          <li><a href="/login" className="footer-link">login</a></li>
          <li><a href="/aboutus" className="footer-link">Sobre Nosotros</a></li>
          <li><a href="/contacto" className="footer-link">Contacto</a></li>
          <li><a href="/sistemapeaje" className="footer-link">Sistema Peaje</a></li>
        </ul>
      </nav>
      
      {/* redes sociales */}
      <div className="footer-social">
        <a href="https://github.com/chavow5/dev-squad" target="_blank" rel="noopener noreferrer" className="footer-social-link">Github Proyecto</a>
      </div>
      <div className="footer-social">
        <a href="https://www.linkedin.com/in/david-ramirez-031015253/" target="_blank" rel="noopener noreferrer" className="footer-social-link">David Ramirez</a>
      </div>
      </center>
    </div>
  </footer>
);

export default Footer;
