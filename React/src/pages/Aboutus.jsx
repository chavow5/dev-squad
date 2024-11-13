// import React from 'react'; //version +17  npm list react     


const Aboutus = () => (
  <div className="aboutus">
    <h2 className="aboutus-title">Sobre Nosotros</h2>
    
    <section className="aboutus-section">
      <h3 className="aboutus-subtitle">Acerca de ViaPass</h3>
      <p className="aboutus-description">
        ViaPass es nuestro proyecto final para la materia de Laboratorio de Computación de la universidad. 
        Nos enfocamos en el desarrollo de un sistema de peaje innovador, en colaboración con un equipo de cuatro personas que hemos llamado Dev Squad
      </p>
    </section>
    
    <section className="aboutus-section">
      <h3 className="aboutus-subtitle">Nuestro Equipo</h3>
      <p className="aboutus-description">
        Nuestro equipo de desarrolladores transforma ideas en realidades digitales, abordando cada desafío con innovación y dedicación. Creemos en el poder de la tecnología para resolver problemas y mejorar la vida de las personas.
      </p>
      <h4 className="aboutus-team-title">Integrantes:</h4>
      <ul className="aboutus-team-list">
        <li className="aboutus-team-member">David Ramírez</li>
        {/* Puedes agregar los nombres de los demás miembros aquí */}
      </ul>
    </section>
    
    {/* Imagen comentada, descomenta si deseas utilizarla */}
    {/* <img src="/img/tarifawpp.jpg" alt="Tarifa ViaPass" className="aboutus-image" /> */}
  </div>
);

export default Aboutus;
