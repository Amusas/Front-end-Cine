import './App.css';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Login from './User/Login';
import Editar_Profile_User from './User/Profile/Editar_Profile_User';
import Registar from './User/Registar';
import Cartelera from './Vista_principal/Cartelera';
import Profile from './User/Profile/Profile';
import React, { useState, useEffect } from 'react';
import MenuAdmin from './Admin/Menu_Admin';
import MovieForm from './Admin/Movies/MovieForm';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Cartelera'); // Estado para almacenar la página actual

  const handleLinkClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (window.location.pathname === '/Menu_admin') {
        setCurrentPage('Perfil');
    }
}, []);

  return (
    <Router>
      <header className="menu">
        <Link to="/Cartelera" className={currentPage === 'Cartelera' ? 'active' : ''} onClick={() => handleLinkClick('Cartelera')}><div className='img'></div></Link>
        <nav>
          <Link to="/Cartelera" className={currentPage === 'Cartelera' ? 'active' : ''} onClick={() => handleLinkClick('Cartelera')}>Cartelera</Link>
          <Link to="/Pronto" className={currentPage === 'Pronto' ? 'active' : ''} onClick={() => handleLinkClick('Pronto')}>Pronto</Link>
          <Link to="/Comida" className={currentPage === 'Comida' ? 'active' : ''} onClick={() => handleLinkClick('Comida')}>Comida</Link>
          <Link to="/Perfil" className={currentPage === 'Perfil' ? 'active' : ''} onClick={() => handleLinkClick('Perfil')}>Perfil</Link>
        </nav>
      </header>

      <Routes>
        <Route path='/Perfil' element={<ProtectedProfile />} />
        <Route path='/Registrar' element={<Registar />} />
        <Route path='/Cartelera' element={<Cartelera />} />
        <Route path='/' element={<Cartelera />} />
        <Route path='/Pelicula/:nombre_pelicula'></Route>
        <Route path='/Login' element={<Login />} />
        <Route path='/Editar_Profile' element={<Editar_Profile_User />} />
        <Route path='/Menu_admin' element={<MenuAdmin />} />
        <Route path='/Movie_form' element={<MovieForm />} />
      </Routes>

      <footer>
        <div>
          <a href="/informacion-legal">Información Legal</a>
          <a href="/acerca-de-cinexd">Acerca del CineXD</a>
          <a href="/contactanos-pqrs">Contáctanos PQRS</a>
          <a href="/preguntas-frecuentes">Preguntas Frecuentes</a>
        </div>
      </footer>
    </Router>
  );
};

const ProtectedProfile = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/Login");
    } else {
      navigate("/Perfil");
    }
  }, [navigate]);

  return <Profile />;
};

export default App;

