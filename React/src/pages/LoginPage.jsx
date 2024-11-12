import { useState } from 'react';
// import React from 'react'; //version +17  npm list react     
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Guardamos el token en localStorage
      setError(null);
      alert('Login exitoso');
    } catch {
      setError('Usuario o contraseña incorrecta');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
