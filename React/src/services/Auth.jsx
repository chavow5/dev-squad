/*
import { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

// Hook con sesion
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente principal
export const AuthProvider = ({ children }) => {
  const [sesion, setSesion] = useState(null);

  const login = async (username, password, ok, error) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
    //   alert("falta que estes logueado")
      error('Credenciales invalidas');
      return;
    }
    // const sesion = await response.json();
    // //console.log(sesion);
    // setSesion(sesion);
    // ok();
    const data = await response.json();
    localStorage.setItem("token", data.token); // Guarda el token en localStorage
    setSesion({ username, token: data.token });
  };

  const logout = (ok) => {
    setSesion(null);
    ok();
  };

  const value = { sesion, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Autorizar pagina
// export const AuthPage = ({ children }) => {
//   const { sesion } = useAuth();
//   const location = useLocation();

//   if (!sesion) {
//       alert("falta que estes logueado");
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };
export const AuthPage = ({ children }) => {
    const { sesion } = useAuth();
    const location = useLocation();
  
    // Si no hay sesión o token, redirige al login
    if (!sesion || !localStorage.getItem("token")) {
        alert("falta iniciar session")
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  };

// Autorizar rol
export const AuthRol = ({ rol, children }) => {
  const { sesion } = useAuth();

  if (!sesion || sesion.rol !== rol) {
    return null;
  }

  return children;
};

// Estado de autorizacion
/*
export const AuthStatus = () => {
  const { sesion, logout } = useAuth();
  const navigate = useNavigate();

  if (!sesion) {
    return <p>No esta conectado</p>;
  }

  return (
    <>
      <p>Conectado como {sesion.username}</p>
      <button onClick={() => logout(() => navigate("/"))}>Salir</button>
    </>
  );
};
*/

import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [sesion, setSesion] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { username: null, token } : null; // Inicializar con el token si existe
  });

  // Función para iniciar sesión
  const login = async (username, password, onSuccess, onError) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token); // Guardar el token en localStorage
      setSesion({ username, token: data.token });
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error.message);
    }
  };

  // Función para cerrar sesión
  const logout = (onSuccess) => {
    localStorage.removeItem("token"); // Borrar el token de localStorage
    setSesion(null);
    if (onSuccess) onSuccess();
  };

  // Validar token al cargar la aplicación
  useEffect(() => {
    const validarToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/auth/validate", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            throw new Error("Token inválido o expirado");
          }
          const data = await response.json();
          setSesion({ username: data.username, token });
        } catch {
          logout();
        }
      }
    };
    validarToken();
  }, []);

  return (
    <AuthContext.Provider value={{ sesion, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente para proteger rutas
export const AuthPage = ({ children }) => {
  const { sesion } = useAuth();
  const location = useLocation();

  if (!sesion || !localStorage.getItem("token")) {
    alert('necesitas iniciar session para ingresar a esta pagina')
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Componente para proteger rutas por rol
export const AuthRol = ({ rol, children }) => {
  const { sesion } = useAuth();

  if (!sesion || sesion.rol !== rol) {
    return null;
  }

  return children;
};

