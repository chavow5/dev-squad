// import React from 'react'; //version +17  npm list react     
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    {/* <img src="./img/ViaPass_logo_horizontal.png" alt="logo" className="logo-ViaPass" style={{ width: "150px", height: "auto" }} /> */}
    <h2>ViaPass</h2>
    <h3>Sistema de peaje manual</h3>
    <nav className='header-nav'>
      <Link to="/">Inicio</Link>
      <Link to="/login">Login</Link>
      <Link to="/aboutus">Sobre Nosotros</Link>
      <Link to="/contacto">Contacto</Link>
      <Link to="/viapass">ViaPass</Link>

    </nav>
  </header>
);

export default Header;
