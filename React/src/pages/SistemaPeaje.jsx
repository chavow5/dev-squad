import { useState } from 'react';

const SistemaPeaje = () => {
  //pruebas hasta conectar base de datos
  const [vehiculo, setVehiculo] = useState({
    tipo: '',
    precio: '',
    metodoPago: '',
    total: '',
  });

  const [datos, setDatos] = useState([]);

  const handleChange = (e) => {
    setVehiculo({
      ...vehiculo,
      [e.target.name]: e.target.value,
    });
  };

  const cargarDato = () => {
    setDatos([...datos, vehiculo]);
    setVehiculo({ tipo: '', precio: '', metodoPago: '', total: '' });
  };

  const eliminarDato = (index) => {
    const nuevosDatos = datos.filter((_, i) => i !== index);
    setDatos(nuevosDatos);
  };

  const habilitarBarrera = () => {
    alert('¡Barrera habilitada!');
  };

  const imprimirDato = (dato) => {
    console.log('Imprimiendo datos:', dato);
    alert(`Datos del vehículo: \nTipo: ${dato.tipo}\nPrecio: ${dato.precio}\nMétodo de Pago: ${dato.metodoPago}\nTotal: ${dato.total}`);
  };

  const salirInicio = () => {
    window.location.href = '/';
  };

  const cerrarSesion = () => {
    alert('Sesión cerrada.');
    window.location.href = '/login';
  };

  return (
    <div className="sistema-peaje">
      <h2 className="sistema-peaje-title">Sistema de Peaje</h2>
      <section className="sistema-peaje-controls-login">
        <button onClick={salirInicio}>Salir</button>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </section>
      
      {/* Formulario para datos del vehículo */}
      <section className="sistema-peaje-form-section">
        <h3>Registrar vehículo</h3>
        <form className="sistema-peaje-form">
        <label>
            Categoria:
            <select name="tipo" value={vehiculo.tipo} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="Motocicleta">1.Motocicleta</option>
              <option value="Automovil">2.Automovil</option>
              <option value="Camioneta">3.Camioneta</option>
              <option value="Camion">4.Camion</option>
            </select>
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={vehiculo.precio}
              onChange={handleChange}
              placeholder="Precio del peaje"
              required
            />
          </label>
          <label>
            Método de pago:
            <select name="metodoPago" value={vehiculo.metodoPago} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>
          </label>
          <label>
            Total:
            <input
              type="number"
              name="total"
              value={vehiculo.total}
              onChange={handleChange}
              placeholder="Total a pagar"
              required
            />
          </label>
          <button type="button" onClick={cargarDato}>
            Cargar Datos
          </button>
        </form>
      </section>

      {/* Botones de control */}
      <section className="sistema-peaje-controls">
        <button onClick={habilitarBarrera}>Habilitar Barrera</button>
      </section>
    
     {/* Listado de datos */}
     <section className="sistema-peaje-list-section">
        <h3>Datos registrados</h3>
        {datos.length > 0 ? (
          <ul>
            {datos.map((dato, index) => (
              <li key={index}>
                {`Tipo: ${dato.tipo}, Precio: ${dato.precio}, Método de Pago: ${dato.metodoPago}, Total: ${dato.total}`}
                <button onClick={() => eliminarDato(index)}>Eliminar</button>
                <button onClick={() => imprimirDato(dato)}>Imprimir</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay datos registrados.</p>
        )}
      </section>
    
    </div>
  );
};

export default SistemaPeaje;
