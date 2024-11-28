import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrarUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    nombreCompleto: '',
    username: '',
    password: '',
    confirmarPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const { email, nombreCompleto, username, password, confirmarPassword } = formData;

    if (!email || !nombreCompleto || !username || !password || !confirmarPassword) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo válido");
      return;
    }

    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:3000/usuarios', {
        email,
        nombreCompleto,
        username,
        password,
      });
      alert(`Usuario ${username} creado con éxito`);
      navigate('/login');
    } catch (err) {
      console.error("Error al crear el usuario:", err);
      alert("Ocurrió un error al crear el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear nueva Cuenta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="nombreCompleto"
          placeholder="Nombre Completo"
          value={formData.nombreCompleto}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Ingrese Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmarPassword"
          placeholder="Confirmar Contraseña"
          value={formData.confirmarPassword}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </button>
      </form>
    </div>
  );
};

export default RegistrarUser;



// import { useState } from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom' 

// const RegistrarUser = () => {
//   const [email, setEmail] = useState('');
//   const [nombreCompleto, setNombreCompleto] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmarPassword, setConfirmarPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     // confirmar la contrase;as
//     if (password !== confirmarPassword) {
//       alert("las contraseñas no coinciden");
//       return;
//     }
//     try {
//       await axios.post('http://localhost:3000/usuarios', { username, password, email, nombreCompleto });
//       console.log("Usuario creado con éxito");
//       alert(`usuario ${username} creado con Exito`)
//       navigate('/login')
//     } catch (err) {
//       console.error("Error al crear el usuario:", err);
//       alert("Error al crear el usuario")
//     }
//   };

//   return (
//     <div>
//       <h2>Crear nueva Cuenta</h2>
//       <form onSubmit={handleRegister}>
//       <input 
//           type="text" 
//           placeholder="Nombre Completo" 
//           value={nombreCompleto} 
//           onChange={(e) => setNombreCompleto(e.target.value)} 
//         />
//         <input 
//           type="text" 
//           placeholder="Email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//         />
//         <input 
//           type="text" 
//           placeholder="Nombre de Usuario" 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} 
//         />
//         {/* crear contrase;a */}
//         <input 
//           type="password" 
//           placeholder="Ingrese Contraseña" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//         />
//         {/* contrase;a confirmar */}
//         <input
//         type="password"
//         placeholder="Confirmar contraseña"
//         value={confirmarPassword}
//         onChange={(e)=> setConfirmarPassword(e.target.value)}>
//         </input>
//         <button type="submit">Crear Cuenta</button>
//       </form>
//     </div>
//   );
// };

// export default RegistrarUser;
