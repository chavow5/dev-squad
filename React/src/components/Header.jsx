// import React from 'react'; //version +17  npm list react     
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Sistema de Peaje</h1>
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/login">Login</Link>
      <Link to="/aboutus">Sobre Nosotros</Link>
      <Link to="/contacto">Contacto</Link>

    </nav>
  </header>
);

export default Header;
