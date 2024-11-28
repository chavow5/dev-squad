// import React from 'react'; //version +17  npm list react     


const ViaPass = () => (
  <div className="viapass">
    <center>
    <h2 className="viapass-title">Sumate a ViaPass</h2>
    
    <section className="viapass-section">
      <h3 className="viapass-subtitle">Sistema de Peaje Electrónico</h3>
      <p className="viapass-description"> Ahorrás hasta un 30% de descuento con ViaPass. </p>
    </section>
    
    <section className="viapass-section">
      <h3 className="viapass-subtitle">¿Cómo adquiero mi ViaPass?</h3>
      <p className="viapass-description">
        Si aún no estás registrado, podés crear una cuenta desde aquí:
      </p>
      <button type="button" className="contacto-form-button" onClick={() => alert("El boton no esta disponible")}>Registar</button>
      
      <p className="viapass-description">
        Si ya tienes una cuenta podés ingresar desde aquí:
      </p>
      <button type="button" className="contacto-form-button" onClick={() => alert("El boton no esta disponible")}>Iniciar Sesion</button>
      
      <p className="viapass-description">
        Carga la información de tu vehículo y pagás cuando quieras con tu tarjeta 
      </p>
      

    </section>
    
    {/* <img src="/img/tarifawpp.jpg" alt="Tarifa ViaPass" className="aboutus-image" /> */}
    </center>
  </div>
);

export default ViaPass;
