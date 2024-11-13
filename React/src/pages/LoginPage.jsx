// import React from 'react'; //version +17  npm list react     
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitud desde la Api Auth.js
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      console.log('Token recibido:', response.data.token); // Mostrar el token en la consola
      
      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', response.data.token);
      setError(null);
      alert(`Bienvenido ${username} al sistema de peaje`);
      navigate('/home'); // Redirige a la página de inicio o dashboard
    } catch (error) {
      console.error('Error en la conexión:', error); // Mostrar cualquier error en la consola
      setError('Usuario o contraseña incorrecta');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Ingresar</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>¿No tienes una cuenta?</p>
        <button 
          onClick={handleRegisterClick} 
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          Crear una cuenta
        </button>
      </div>
    </div>
  );
};

export default LoginPage;