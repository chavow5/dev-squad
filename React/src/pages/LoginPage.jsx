// import React from 'react'; //version +17  npm list react     
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Auth";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();


  /* vieja forma con token
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitud desde la Api Auth.js
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      console.log('Token recibido:', response.data.token); // Mostrar el token en la consola
      
      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', response.data.token);
      setError(null);
      
      //pagina del sistema de peaje
      alert(`Bienvenido ${username} al sistema de peaje`);
      navigate('/sistemapeaje'); // Redirige a la página de inicio o dashboard
    } catch (error) {
      console.error('Error en la conexión:', error); // Mostrar cualquier error en la consola
      setError('Usuario o contraseña incorrecta'); 
    }
  };
  */

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError(null);
    await login(
      username,
      password,
      () => {
        alert(`Bienvenido ${username} al sistema de peaje`);
        navigate("/sistemapeaje");
      },
      (err) => {
        alert(`Credenciales invalidas reintentar`);
        setError(err);
      }
    );
  };




  // boton de crear usuario
  const registarUsuario = () => {
    navigate('/registrarusuario');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={iniciarSesion}>
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

      
      <div className="crear-cuenta-container">
        <p className="crear-cuenta-text">¿No tienes una cuenta?</p>
        <button onClick={registarUsuario} className="crear-cuenta-boton">
          Crear una cuenta
        </button>
      </div>

    </div>
  );
};

export default LoginPage;
