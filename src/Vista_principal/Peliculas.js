import './Styles/Peliculas.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Pelicula({ titulo, imagen, fecha, clasificacion }) {
    return (
        <div className="container">
            <Link to={'/Pelicula/' + titulo}><img src={imagen} alt='imagen de una pelicula'/></Link>
            <h4>{titulo}</h4>
            <p>{fecha}</p>
            <p>{clasificacion}</p>
        </div>
    )
}

export default Pelicula;