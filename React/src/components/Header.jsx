import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/components/Header.css';

const Header = () => (
  <header>
    <Navbar collapseOnSelect expand="lg" className="navbar-black">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/img/ViaPass_logo_horizontal.png"
            alt="ViaPass Logo"
            width="160"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Configuración menú en formato de pestañas Boostrap react */}
          <Nav variant="tabs" className="ms-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/" eventKey="home">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login" eventKey="login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/aboutus" eventKey="aboutus">Sobre Nosotros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contacto" eventKey="contacto">Contacto</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/viapass" eventKey="viapass">ViaPass</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
