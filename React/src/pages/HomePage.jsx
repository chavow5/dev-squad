// import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const HomePage = () => (
  <Container className="homepage mt-5">
    <Card className="text-center mb-4">
      <Card.Header as="h2">Trabajo Práctico Final de Laboratorio 4 - Sistema de Peaje</Card.Header>
      <Card.Body>
        <Card.Text>
          Este es el proyecto final de Laboratorio 4 de la Universidad Tecnológica Nacional (UTN), Facultad de La Rioja. 
          Desarrollado por el Grupo N° 8, el proyecto está enfocado en la creación de un sistema de peaje, aplicando conocimientos 
          adquiridos durante la Tecnicatura en Programación.
        </Card.Text>
        <Button variant="primary" href="#tarifas">
          Ver Tarifas de Peaje
        </Button>
      </Card.Body>
    </Card>

    <Card className="text-center mb-4" id="tarifas">
      <Card.Header as="h3">Listado de Tarifas de Peajes</Card.Header>
      <Card.Body>
        <Image 
          src="/img/tarifasCba.png" 
          alt="tarifasCba" 
          fluid 
          className="homepage-tarifasCba" 
          style={{ maxWidth: "800px", height: "auto" }}
        />
      </Card.Body>
    </Card>
  </Container>
);

export default HomePage;
