import { useState } from 'react';
import axios from 'axios';

const RegistrarUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/usuarios', { username, password });
      console.log("Usuario creado con éxito");
      alert("usuario Creado con Exito")

    } catch (err) {
      console.error("Error al crear el usuario:", err);
    }
  };

  return (
    <div>
      <h2>Crear Cuenta</h2>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>} */}
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default RegistrarUser;
