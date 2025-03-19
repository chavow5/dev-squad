import { useState, useEffect } from "react";
import axios from "axios";

const SistemaPeaje = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    patente: "",
    tipo_vehiculo: "",
    numero_cabina: "",
    precio: "",
    fecha: "",
    metodo_pago: "",
  });
  const [filter, setFilter] = useState({
    search: "",
    tipo_vehiculo: "",
    metodo_pago: "",
  });
  const [editVehiculo, setEditVehiculo] = useState(null);

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/vehiculos");
      setVehiculos(data.vehiculos);
    } catch (error) {
      console.error("Error al obtener los vehículos", error);
    }
  };

  const handleAddVehiculo = async (e) => {
    e.preventDefault();
    if (editVehiculo) {
      // Editar vehículo 
      try {
        await axios.put(`http://localhost:3000/vehiculos/${editVehiculo.id_vehiculos}`, nuevoVehiculo);
        fetchVehiculos();
        setNuevoVehiculo({
          patente: "",
          tipo_vehiculo: "",
          numero_cabina: "",
          precio: "",
          fecha: "",
          metodo_pago: "",
        });
        setEditVehiculo(null);
        alert("Vehículo actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el vehículo", error);
        alert("Error al actualizar el vehículo o faltan datos");
      }
    } else {
      // Agregar vehículo
      try {
        await axios.post("http://localhost:3000/vehiculos", nuevoVehiculo);
        fetchVehiculos();
        setNuevoVehiculo({
          patente: "",
          tipo_vehiculo: "",
          numero_cabina: "",
          precio: "",
          fecha: "",
          metodo_pago: "",
        });
        alert("Vehículo agregado correctamente");
      } catch (error) {
        console.error("Error al agregar el vehículo", error);
        alert("Error al agregar el vehículo");
      }
    }
  };

  const handleEdit = (vehiculo) => {
    setNuevoVehiculo(vehiculo);
    setEditVehiculo(vehiculo);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/vehiculos/${id}`);
      fetchVehiculos();
      alert("Vehículo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el vehículo", error);
      alert("Error al eliminar el vehículo");
    }
  };

  const filteredVehiculos = vehiculos.filter((vehiculo) => {
    return (
      (!filter.search || vehiculo.id_vehiculos.toString().includes(filter.search)) &&
      (!filter.tipo_vehiculo || vehiculo.tipo_vehiculo === filter.tipo_vehiculo) &&
      (!filter.metodo_pago || vehiculo.metodo_pago === filter.metodo_pago)
    );
  });

  //total
  const totalPrecio = filteredVehiculos.reduce(
    (acc, vehiculo) => acc + (parseFloat(vehiculo.precio) || 0),
    0
  );

  //imprimir en pdf
  const handlePrint = () => {
    window.print();
  };

  // botones
  const salirInicio = () => {
    window.location.href = '/';
  };

  const cerrarSesion = () => {
    alert('Sesión cerrada.');
    window.location.href = '/login';
  };
  return (
    <div>
      <h2>Sistema Peaje</h2>
      <section className="sistema-peaje-controls-login">
         <button onClick={salirInicio}>Salir</button>
         <button onClick={cerrarSesion}>Cerrar Sesión</button>
       </section>
      <form onSubmit={handleAddVehiculo}>
        <h3>{editVehiculo ? "Editar Vehículo" : "Agregar Vehículo"}</h3>
        <input
          type="text"
          placeholder="Patente"
          value={nuevoVehiculo.patente}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, patente: e.target.value })}
        />
        <select
          value={nuevoVehiculo.tipo_vehiculo}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, tipo_vehiculo: e.target.value })}
        >
          <option value="">Seleccionar tipo</option>
          <option value="moto">Moto</option>
          <option value="auto">Auto</option>
          <option value="camioneta">Camioneta</option>
          <option value="camion">Camión</option>
        </select>
        <input
          type="number"
          placeholder="Número de Cabina"
          min="1"
          max="6"
          value={nuevoVehiculo.numero_cabina}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, numero_cabina: e.target.value })}
        />
        <input
          type="number"
          step="500"
          placeholder="Precio"
          value={nuevoVehiculo.precio}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, precio: e.target.value })}
        />
        <input
          type="date"
          placeholder="Fecha"
          value={nuevoVehiculo.fecha}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, fecha: e.target.value })}
        />
        <select
          value={nuevoVehiculo.metodo_pago}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, metodo_pago: e.target.value })}
        >
          <option value="">Seleccionar método de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia Alias: ViaPass</option>
          <option value="qr">QR</option>
        </select>
        <button type="submit">{editVehiculo ? "Actualizar Vehículo" : "Agregar Vehículo"}</button>
      </form>

      <h2> Lista de Vehículos</h2>
      <input
        type="text"
        placeholder="Buscar por ID"
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      />
      <select
        onChange={(e) => setFilter({ ...filter, tipo_vehiculo: e.target.value })}
      >
        <option value="">Tipo de Vehículo</option>
        <option value="moto">Moto</option>
        <option value="auto">Auto</option>
        <option value="camioneta">Camioneta</option>
        <option value="camion">Camión</option>
      </select>
      <select
        onChange={(e) => setFilter({ ...filter, metodo_pago: e.target.value })}
      >
        <option value="">Método de Pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="transferencia">Transferencia</option>
        <option value="qr">QR</option>
      </select>

      <button onClick={handlePrint}>Imprimir Historial</button>
      <h3>Total ${totalPrecio.toFixed(2)}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patente</th>
            <th>Tipo</th>
            <th>Cabina</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Método de Pago</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehiculos.map((vehiculo) => (
            <tr key={vehiculo.id_vehiculos}>
              <td>{vehiculo.id_vehiculos}</td>
              <td>{vehiculo.patente}</td>
              <td>{vehiculo.tipo_vehiculo}</td>
              <td>{vehiculo.numero_cabina || "x"}</td>
              <td>{vehiculo.precio || "x"}</td>
              <td>{vehiculo.fecha || "x"}</td>
              <td>{vehiculo.metodo_pago || "x"}</td>
              <td>{vehiculo.usuario || ""}</td> 
              <td>
                <button onClick={() => handleEdit(vehiculo)}>Editar</button>
                <button onClick={() => handleDelete(vehiculo.id_vehiculos)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default SistemaPeaje;

