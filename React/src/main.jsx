import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' importar la carpeta correcta
import App from './App.jsx'
//auth
import { AuthProvider } from "./services/Auth";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
)
