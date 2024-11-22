import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom' 

const RegistrarUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // confirmar la contrase;as
    if (password !== confirmarPassword) {
      alert("las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post('http://localhost:3000/usuarios', { username, password });
      console.log("Usuario creado con éxito");
      alert(`usuario ${username} creado con Exito`)
      navigate('/login')
      

    } catch (err) {
      console.error("Error al crear el usuario:", err);
      alert("la contraseña es muy corta")
    }
  };

  return (
    <div>
      <h2>Crear nueva Cuenta</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        {/* crear contrase;a */}
        <input 
          type="password" 
          placeholder="Ingrese Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {/* contrase;a confirmar */}
        <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmarPassword}
        onChange={(e)=> setConfirmarPassword(e.target.value)}>
        </input>
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default RegistrarUser;
