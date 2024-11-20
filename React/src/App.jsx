// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Contacto from './pages/Contacto';
import Aboutus from './pages/Aboutus';
import ViaPass from './pages/ViaPass';
import RegistrarUser from './pages/RegistrarUser';
import SistemaPeaje from './pages/SitemaPeaje';

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/viapass" element={<ViaPass />} />
        <Route path="/registrarusuario" element={<RegistrarUser />} />
        

        {/* ocultar pagina, ver despues de login  */}
        <Route path="/sistemapeaje" element={<SistemaPeaje />} />

      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
