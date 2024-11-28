import { useState, useEffect } from 'react';
import axios from 'axios';

const SistemaPeaje = () => {
  const [vehiculo, setVehiculo] = useState({
    categoria: '',
    precio: '',
    metodoPago: '',
  });

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    obtenerVehiculos(); // Obtener los vehículos al cargar el componente
  }, []);

  // Obtener vehículos de la base de datos
  const obtenerVehiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/vehiculos');
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      alert('Error al obtener vehículos');
    }
  };

  // Registrar un nuevo vehículo
  const cargarDato = async () => {
    try {
      const response = await axios.post('http://localhost:3000/vehiculos', vehiculo);
      setDatos([...datos, response.data]); // Agregar nuevo vehículo al estado
      setVehiculo({ categoria: '', precio: '', metodoPago: '' }); // Limpiar formulario
      alert('Vehículo registrado con éxito');
    } catch (error) {
      console.error('Error al registrar vehículo:', error);
      alert('Error al registrar vehículo');
    }
  };

  // Eliminar un vehículo de la base de datos
  const eliminarDato = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/vehiculos/${id}`);
      setDatos(datos.filter((dato) => dato.id_vehiculo !== id)); // Actualizar el estado sin el elemento eliminado
      alert('Vehículo eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      alert('Error al eliminar vehículo');
    }
  };

  const handleChange = (e) => {
    setVehiculo({
      ...vehiculo,
      [e.target.name]: e.target.value,
    });
  };

  const imprimirDato = (dato) => {
    alert(`Datos del vehículo:\nTipo: ${dato.categoria}\nPrecio: ${dato.precio}\nMétodo de Pago: ${dato.metodo_pago}\nFecha: ${dato.fecha}`);
  };

  return (
    <div className="sistema-peaje">
      <h2>Sistema de Peaje</h2>
      
      {/* Formulario */}
      <form className="sistema-peaje-form">
        <label>
          Categoría:
          <select name="categoria" value={vehiculo.categoria} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Automóvil">Automóvil</option>
            <option value="Camioneta">Camioneta</option>
            <option value="Camión">Camión</option>
          </select>
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="precio"
            value={vehiculo.precio}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Método de Pago:
          <select name="metodoPago" value={vehiculo.metodoPago} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
        </label>
        <button type="button" onClick={cargarDato}>
          Registrar Vehículo
        </button>
      </form>

      {/* Datos cargados */}
      <section>
        <h3>Vehículos Registrados</h3>
        <ul>
          {datos.map((dato) => (
            <li key={dato.id_vehiculo}>
              {`Categoría: ${dato.categoria}, Precio: ${dato.precio}, Método de Pago: ${dato.metodo_pago}, Fecha: ${dato.fecha}`}
              <button onClick={() => eliminarDato(dato.id_vehiculo)}>Eliminar</button>
              <button onClick={() => imprimirDato(dato)}>Imprimir</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SistemaPeaje;
