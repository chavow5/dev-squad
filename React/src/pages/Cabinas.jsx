import { useState, useEffect } from "react";
import axios from "axios";

const Cabinas = () => {
  const [cabinas, setCabinas] = useState([]);


  useEffect(() => {
    fetchCabinas();
  }, []);

  const fetchCabinas = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/cabinas"); // Endpoint para obtener las cabinas
      setCabinas(data.cabinas);
    } catch (error) {
      console.error("Error al obtener las cabinas:", error);
    } 
  };

  return (
    <div className="cabinas-container">
      <h2>Lista de Cabinas</h2>


        <table className="cabinas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {cabinas.length > 0 ? (
              cabinas.map((cabina) => (
                <tr key={cabina.id_cabina}>
                  <td>{cabina.id_cabina}</td>
                  <td>{cabina.nombre}</td>
                  <td>{cabina.ubicacion}</td>
                  <td>{new Date(cabina.fecha_creacion).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay cabinas disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
};

export default Cabinas;
