import './Styles/Profile.css'

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const navigate = useNavigate();  // Usamos useNavigate para redirigir sin recargar la página

    const handleDeleteAccount = async () => {
        // Mostrar la ventana de confirmación con el mensaje
        const userResponse = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?');
        // Dependiendo de la respuesta del usuario, realizar una acción
        if (userResponse) {
            await eliminarCuenta();
        } else {
            console.log("El usuario intentó eliminar su cuenta");
        }
    };

    const handleLogout = () => {
        // eslint-disable-next-line no-restricted-globals
        const resultado = confirm("¿Estás seguro de que deseas cerrar sesion?");
        if(resultado){
             // Limpiar el localStorage y redirigir al usuario a la página de inicio
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/Cartelera');  // Redirige usando useNavigate de react-router-dom
        }    
    };

    return (
        <div className="user-profile">
            <img
                src="Recursos/user.png"  // Usar "/" en lugar de "\" para las rutas de imágenes
                alt="Imagen de usuario"
                className="user-profile__image"
            />
            <h2 className="user-profile__name">{username}</h2>
            <div className="user-profile__buttons">
                <Link to='/Editar_Profile' className="user-profile__button">Editar Perfil</Link>
                <button onClick={handleDeleteAccount} className="user-profile__button--delete">
                    Eliminar Cuenta
                </button>
                <button onClick={handleLogout} className="user-profile__button--logout">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

// Función para eliminar la cuenta
async function eliminarCuenta() {
    try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        const response = await fetch(`http://localhost:8080/Api/Client/delete/${username}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 204) {
            alert('Cuenta eliminada con éxito');
        } else {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            alert('Hubo un error al eliminar tu cuenta.');
        }
    } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        alert('Ocurrió un error al intentar eliminar tu cuenta.');
    }
}

export default Profile;
