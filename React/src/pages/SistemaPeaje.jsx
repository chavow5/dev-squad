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
  const [filter, setFilter] = useState({ dia: "", mes: "" });

  useEffect(() => {
    fetchVehiculos(); 
  }, []);

  const fetchVehiculos = async () => {
    const { data } = await axios.get("http://localhost:3000/vehiculos");
    setVehiculos(data.vehiculos);
  };

  const handleAddVehiculo = async (e) => {
    e.preventDefault();
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
    alert(`Vehículo Agregado}`) 
  };

  //imprimir en pdf
  const handlePrint = () => {
    window.print();
  };

  //filtros
  // const filteredHistorial = vehiculos.filter((item) => {
  //   return (
  //     (filter.dia ? item.dia === filter.dia : true) &&
  //     (filter.mes ? item.mes === filter.mes : true)
  //   );
  // });

  
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
        <h3>Agregar Vehículo</h3>
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
        > <option value="">Seleccionar método de pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="transferencia">Transferencia Alias: ViaPass</option>
        <option value="qr">QR</option>
        {/* <option value="chachos">Chachos</option> */}
        </select>
        <button type="submit">Agregar Vehículo</button>
      </form>

      <h2>Lista de Vehículos</h2>
      <button onClick={handlePrint}>Imprimir Historial</button>
      <div>
        <input
          type="date"
          placeholder="Filtrar por día"
          onChange={(e) => setFilter({ ...filter, dia: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filtrar Historial"
          onChange={(e) => setFilter({ ...filter, mes: e.target.value })}
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patente</th>
            <th>Tipo de Vehículo</th>
            <th>Número de Cabina</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Método de Pago</th>
          </tr>
        </thead>
            {/* <td>
            {editItem?.id_historial === item.id_historial ? (
                  <button onClick={() => handleEdit(item)}>Editar</button>
                ):
                <button onClick={() => handleDelete(item.id_historial)}>Eliminar</button>
              }
            </td> */}
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id_vehiculos}>
              <td>{vehiculo.id_vehiculos}</td>
              <td>{vehiculo.patente}</td>
              <td>{vehiculo.tipo_vehiculo}</td>
              <td>{vehiculo.numero_cabina || "x"}</td>
              <td>{vehiculo.precio || "x"}</td>
              <td>{vehiculo.fecha || "x"}</td>
              <td>{vehiculo.metodo_pago || "x"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 
      <h2>Historial de Peajes</h2>
      <button onClick={handlePrint}>Imprimir Historial</button>

      <div>
        <input
          type="date"
          placeholder="Filtrar por día"
          onChange={(e) => setFilter({ ...filter, dia: e.target.value })}
        />
        <input
          type="number"
          min="1"
          max="12"
          placeholder="Filtrar por mes"
          onChange={(e) => setFilter({ ...filter, mes: e.target.value })}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Mes</th>
            <th>Cabina</th>
            <th>Patente</th>
            <th>Usuario</th>
            <th>Monto Pagado</th>
            <th>Método Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistorial.map((item) => (
            <tr key={item.id_historial}>
              <td>{item.dia}</td>
              <td>{item.mes}</td>
              <td>{item.cabina}</td>
              <td>{item.patente}</td>
              <td>{item.username}</td>
              <td>{editItem?.id_historial === item.id_historial ? (
                <input
                  type="number"
                  value={editItem.monto_pagado}
                  onChange={(e) => setEditItem({ ...editItem, monto_pagado: e.target.value })}
                />
              ) : (
                item.monto_pagado
              )}</td>
              <td>{editItem?.id_historial === item.id_historial ? (
                <select
                  value={editItem.metodo_pago}
                  onChange={(e) => setEditItem({ ...editItem, metodo_pago: e.target.value })}
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="qr">QR</option>
                  <option value="cheques">Cheques</option>
                  <option value="criptomonedas">Criptomonedas</option>
                </select>
              ) : (
                item.metodo_pago
              )}</td>
              <td>
                {editItem?.id_historial === item.id_historial ? (
                  <button onClick={() => saveEdit(item.id_historial)}>Guardar</button>
                ) : (
                  <button onClick={() => handleEdit(item)}>Editar</button>
                )}
                <button onClick={() => handleDelete(item.id_historial)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      */}
    </div>
  );
};

export default SistemaPeaje;



// import { useState, useEffect } from "react";
// import axios from "axios";

// const SistemaPeaje = () => {
//   const [vehiculos, setVehiculos] = useState([]);
//   const [historial, setHistorial] = useState([]);
//   const [nuevoVehiculo, setNuevoVehiculo] = useState({ patente: "", tipo_vehiculo: "" });
//   const [nuevoPeaje, setNuevoPeaje] = useState({ id_cabina: "", id_vehiculo: "", monto_pagado: "" });

//   useEffect(() => {
//     fetchVehiculos();
//     fetchHistorial();
//   }, []);

//   const fetchVehiculos = async () => {
//     const { data } = await axios.get("http://localhost:3000/vehiculos");
//     setVehiculos(data);
//   };

//   const fetchHistorial = async () => {
//     const { data } = await axios.get("http://localhost:3000/historial");
//     setHistorial(data);
//   };

//   const handleAddVehiculo = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:3000/vehiculos", nuevoVehiculo);
//     fetchVehiculos();
//     setNuevoVehiculo({ patente: "", tipo_vehiculo: "" });
//   };

//   const handleAddPeaje = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:3000/historial", nuevoPeaje);
//     fetchHistorial();
//     setNuevoPeaje({ id_cabina: "", id_vehiculo: "", monto_pagado: "" });
//   };
// const handlePrint = () => {
//   window.print();
// };

//   return (
//     <div>
//       <h2>Registro de Peajes</h2>

//       <form onSubmit={handleAddVehiculo}>
//         <h3>Agregar Vehículo</h3>
//         <input
//           type="text"
//           placeholder="Patente"
//           value={nuevoVehiculo.patente}
//           onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, patente: e.target.value })}
//         />
//         <select
//           value={nuevoVehiculo.tipo_vehiculo}
//           onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, tipo_vehiculo: e.target.value })}
//         >
//           <option value="">Seleccionar tipo</option>
//           <option value="moto">Moto</option>
//           <option value="auto">Auto</option>
//           <option value="camioneta">Camioneta</option>
//           <option value="camion">Camión</option>
//         </select>
//         <button type="submit">Agregar Vehículo</button>
//       </form>

//       <form onSubmit={handleAddPeaje}>
//         <h3>Registrar Peaje</h3>
//         <input
//           type="number"
//           placeholder="ID Cabina"
//           value={nuevoPeaje.id_cabina}
//           onChange={(e) => setNuevoPeaje({ ...nuevoPeaje, id_cabina: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="ID Vehículo"
//           value={nuevoPeaje.id_vehiculo}
//           onChange={(e) => setNuevoPeaje({ ...nuevoPeaje, id_vehiculo: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Monto Pagado"
//           value={nuevoPeaje.monto_pagado}
//           onChange={(e) => setNuevoPeaje({ ...nuevoPeaje, monto_pagado: e.target.value })}
//         />
//         <button type="submit">Registrar Peaje</button>
//       </form>

//       <h3>Historial</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Fecha</th>
//             <th>Cabina</th>
//             <th>Patente</th>
//             <th>Usuario</th>
//             <th>Monto Pagado</th>
//           </tr>
//         </thead>
//         <tbody>
//           {historial.map((item) => (
//             <tr key={item.id_historial}>
//               <td>{item.fecha_peaje}</td>
//               <td>{item.cabina}</td>
//               <td>{item.patente}</td>
//               <td>{item.username}</td>
//               <td>{item.monto_pagado}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SistemaPeaje;


// import { useState } from 'react';

// const SistemaPeaje = () => {
//   //pruebas hasta conectar base de datos
//   const [vehiculo, setVehiculo] = useState({
//     tipo: '',
//     precio: '',
//     metodoPago: '',
//     total: '',
//   });

//   const [datos, setDatos] = useState([]);

//   const handleChange = (e) => {
//     setVehiculo({
//       ...vehiculo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const cargarDato = () => {
//     setDatos([...datos, vehiculo]);
//     setVehiculo({ tipo: '', precio: '', metodoPago: '', total: '' });
//   };

//   const eliminarDato = (index) => {
//     const nuevosDatos = datos.filter((_, i) => i !== index);
//     setDatos(nuevosDatos);
//   };

//   const habilitarBarrera = () => {
//     alert('¡Barrera habilitada!');
//   };

  // const imprimirDato = (dato) => {
  //   console.log('Imprimiendo datos:', dato);
  //   alert(`Datos del vehículo: \nTipo: ${dato.tipo}\nPrecio: ${dato.precio}\nMétodo de Pago: ${dato.metodoPago}\nTotal: ${dato.total}`);
  // };

  // const salirInicio = () => {
  //   window.location.href = '/';
  // };

  // const cerrarSesion = () => {
  //   alert('Sesión cerrada.');
  //   window.location.href = '/login';
  // };

//   return (
//     <div className="sistema-peaje">
//       <h2 className="sistema-peaje-title">Sistema de Peaje</h2>
//       <section className="sistema-peaje-controls-login">
//         <button onClick={salirInicio}>Salir</button>
//         <button onClick={cerrarSesion}>Cerrar Sesión</button>
//       </section>
      
//       {/* Formulario para datos del vehículo */}
//       <section className="sistema-peaje-form-section">
//         <h3>Registrar vehículo</h3>
//         <form className="sistema-peaje-form">
//         <label>
//             Categoria:
//             <select name="tipo" value={vehiculo.tipo} onChange={handleChange} required>
//               <option value="">Seleccionar</option>
//               <option value="Motocicleta">1.Motocicleta</option>
//               <option value="Automovil">2.Automóvil</option>
//               <option value="Camioneta">3.Camioneta</option>
//               <option value="Camion">4.Camion</option>
//             </select>
//           </label>
//           <label>
//             Precio:
//             <input
//               type="number"
//               name="precio"
//               value={vehiculo.precio}
//               onChange={handleChange}
//               placeholder="Precio del peaje"
//               required
//             />
//           </label>
//           <label>
//             Método de pago:
//             <select name="metodoPago" value={vehiculo.metodoPago} onChange={handleChange} required>
//               <option value="">Seleccionar</option>
//               <option value="Efectivo">Efectivo</option>
//               <option value="Tarjeta">Tarjeta</option>
//             </select>
//           </label>
//           <label>
//             Total:
//             <input
//               type="number"
//               name="total"
//               value={vehiculo.total}
//               onChange={handleChange}
//               placeholder="Total a pagar"
//               required
//             />
//           </label>
//           <button type="button" onClick={cargarDato}>
//             Cargar Datos
//           </button>
//         </form>
//       </section>

//       {/* Botones de control */}
//       <section className="sistema-peaje-controls">
//         <button onClick={habilitarBarrera}>Habilitar Barrera</button>
//       </section>
    
//      {/* Listado de datos */}
//      <section className="sistema-peaje-list-section">
//         <h3>Datos registrados</h3>
//         {datos.length > 0 ? (
//           <ul>
//             {datos.map((dato, index) => (
//               <li key={index}>
//                 {`Tipo: ${dato.tipo}, Precio: ${dato.precio}, Método de Pago: ${dato.metodoPago}, Total: ${dato.total}`}
//                 <button onClick={() => eliminarDato(index)}>Eliminar</button>
//                 <button onClick={() => imprimirDato(dato)}>Imprimir</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No hay datos registrados.</p>
//         )}
//       </section>
    
//     </div>
//   );
// };

