// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Contacto from './pages/Contacto';
import Aboutus from './pages/Aboutus';
import ViaPass from './pages/ViaPass';

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
        
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
