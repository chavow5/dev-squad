// import React from 'react'; //version +17  npm list react     


const ViaPass = () => (
  <div className="viapass">
    <center>
    <h2 className="viapass-title">Sumate a ViaPass</h2>
    
    <section className="viapass-section">
      <h3 className="viapass-subtitle">Sistema de peaje Electronico</h3>
      <p className="viapass-description"> Ahorras hasta un 30% de descuento con , ahorrando tiempo y dinero </p>
    </section>
    
    <section className="viapass-section">
      <h3 className="viapass-subtitle">Como adquiero mi Viapass?</h3>
      <p className="viapass-description">
        Si aun no estas registrado, podes crear una cuenta desde aqui 
      </p>
      <button type="button" className="contacto-form-button" onClick={() => alert("El boton no esta disponible")}>Registar</button>
      
      <p className="viapass-description">
        Si ya tienes una cuenta podes ingresar desde aqui 
      </p>
      <button type="button" className="contacto-form-button" onClick={() => alert("El boton no esta disponible")}>Iniciar Sesion</button>
      
      <p className="viapass-description">
        Carga la informacion de tu vehiculo y pagas cuando quieras con tu tarjeta 
      </p>
      

    </section>
    
    {/* Imagen comentada, descomenta si deseas utilizarla */}
    {/* <img src="/img/tarifawpp.jpg" alt="Tarifa ViaPass" className="aboutus-image" /> */}
    </center>
  </div>
);

export default ViaPass;
