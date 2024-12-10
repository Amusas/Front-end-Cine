import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Menu_Admin.css';

const MenuAdmin = () => {
    return (
        <div className="menu-container">
            <nav className="menu_admin">
                <ul>
                    <li>
                        <Link to="/peliculas">Películas</Link>
                    </li>
                    <li>
                        <Link to="/comida">Comida</Link>
                    </li>
                    <li>
                        <Link to="/estrenos">Próximos Estrenos</Link>
                    </li>
                    <li>
                        <Link to="/usuarios">Usuarios</Link>
                    </li>
                    <li>
                        <button onClick={() => alert('Cerrar sesión')}>Cerrar Sesión</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MenuAdmin;
