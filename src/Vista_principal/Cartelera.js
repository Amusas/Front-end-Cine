import './Styles/Cartelera.css'
import Icon from '../Recursos/Icon';
import { faCartShopping, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Pelicula from './Peliculas';
import React from 'react';

function Cartelera() {
    // Lista de películas
    const peliculas = [
        { titulo: "El chico y la garza", imagen: "Recursos/chicoPoster.jpg", fecha: "12:30pm", clasificacion: "12PG" },
        { titulo: "Barbie", imagen: "Recursos/Barbie.jpg", fecha: "1:30pm 5:00Pm", clasificacion: "8PG" },
        { titulo: "Pulp Fiction", imagen: "Recursos/Pulp.jpg", fecha: "12:30pm 10:30Am", clasificacion: "16PG" },
        { titulo: "John Wick 4", imagen: "Recursos/John.jpg", fecha: "7:30pm 10:00Pm", clasificacion: "18PG" },
        { titulo: "Spider-man", imagen: "Recursos/Spider.jpg", fecha: "12:30pm 1:00Pm", clasificacion: "10PG" },
        { titulo: "Pulp Fiction", imagen: "Recursos/Pulp.jpg", fecha: "12:30pm 10:30Am", clasificacion: "16PG" },
        { titulo: "John Wick 4", imagen: "Recursos/John.jpg", fecha: "7:30pm 10:00Pm", clasificacion: "18PG" },
        { titulo: "Barbie", imagen: "Recursos/Barbie.jpg", fecha: "1:30pm 5:00Pm", clasificacion: "8PG" }
    ];

    return (
        <div>
            <main className="pelicula_principal">
                <div>
                    <h3 className="titulo">Oppenheimer (2023)</h3>
                    <p className="descripcion">
                        Película sobre el físico J. Robert Oppenheimer y su papel como desarrollador de la bomba atómica. 
                        Basada en el libro 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer' de Kai Bird y Martin J. Sherwin.
                    </p>
                    <div className='botones'>
                        <button className='botonC'>
                            <Icon icon={faCartShopping} />
                            Comprar
                        </button>
                        <button className='botonC'>
                            <Icon icon={faCircleInfo} />
                            Más información
                        </button>
                    </div>
                </div>
            </main>

            {/* Sección dfe películas */}
            <section className='peliculas'>
                {peliculas.map((pelicula, index) => (
                    <Pelicula
                        key={index}
                        titulo={pelicula.titulo}
                        imagen={pelicula.imagen}
                        fecha={pelicula.fecha}
                        clasificacion={pelicula.clasificacion}
                    />
                ))}
            </section>
        </div>
    );
}

export default Cartelera;
