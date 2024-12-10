import './Styles/Editar_Profile.css'

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Editar_Profile_User = () => {
    // Estado consolidado para usuario y contraseña
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Inicializar estado con localStorage en el primer render
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setFormData((prevData) => ({
                ...prevData,
                username: storedUsername
            }));
        }
    }, []);  // Este useEffect se ejecuta solo una vez al montar el componente.

    // Actualizar el estado en función de los cambios en los inputs
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    // Lógica para actualizar las credenciales
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const { username, password } = formData;
        const oldUsername = localStorage.getItem('username');

        if (!username || !password) {
            alert('Por favor, ingresa un nombre de usuario y una contraseña.');
            return;
        }

        const valores = { username, password, oldUsername };

        try {
            const result = await actualizarCredenciales(valores);
            if (result.success) {
                localStorage.setItem('username', username);
            } else {
                alert('Error al actualizar las credenciales. Intenta nuevamente.');
            }
        } catch (error) {
            alert('Ocurrió un error al actualizar las credenciales.');
            console.error(error);
        }
    };

    const handleManageCreditCards = () => {
        // Lógica para administrar tarjetas de crédito
        console.log('Administrar tarjetas de crédito');
    };

    return (
        <div className="edit-user-profile">
            <h2>Actualizar Credenciales</h2>
            <form className='formulario_editar' onSubmit={handleUpdate}>
                <div className='formulario_editar'>
                    <label className='label_editar'>
                        Nombre de usuario:
                        <br />
                        <input
                            className='inputs_editar'
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <div className="input-line"></div>
                    </label>
                </div>
                <div className='formulario_editar'>
                    <label className='label_editar'>
                        Contraseña:
                        <br />
                        <input
                            className='inputs_editar'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <div className="input-line"></div>
                    </label>
                </div>
                <button className='boton_Actualizar' type="submit">
                    Actualizar Credenciales
                </button>
            </form>
            <button className='botones_editar' onClick={handleManageCreditCards}>
                Administrar Tarjetas de Crédito
            </button>
            <Link to='/Perfil' className='atras_editar'>Atrás</Link>
        </div>
    );
};

const actualizarCredenciales = async (valores) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/Api/Client/actualizar`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(valores)
        });

        if (response.status === 200) {
            alert('Credenciales actualizadas correctamente');
            return { success: true };
        } else {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            return { success: false, data };
        }
    } catch (error) {
        console.error('Error al actualizar las credenciales:', error);
        return { success: false, error };
    }
};

export default Editar_Profile_User;

