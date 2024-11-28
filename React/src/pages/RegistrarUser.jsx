import { useState } from 'react';
import axios from 'axios';

const RegistrarUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idRol, setIdRol] = useState('1'); // valor por defecto
  const [mail, setMail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !mail) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      await axios.post('http://localhost:3000/usuarios', { 
        username, 
        password, 
        id_rol: idRol, 
        mail 
      });
      alert(`Usuario ${username} creado con éxito`);
    } catch (err) {
      console.error("Error al crear el usuario:", err);
      alert("Hubo un error al crear el usuario.");
    }
  };

  return (
    <div>
      <h2>Crear Cuenta</h2>
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
        <input 
          type="email" 
          placeholder="Email" 
          value={mail} 
          onChange={(e) => setMail(e.target.value)} 
        />
        <select value={idRol} onChange={(e) => setIdRol(e.target.value)}>
          <option value="1">Administrador</option>
          <option value="2">Operador</option>
        </select>
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default RegistrarUser;
