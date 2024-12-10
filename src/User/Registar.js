import './Styles/Registar.css';
import React, { useState } from 'react';

import {Link, useNavigate } from 'react-router-dom';

function Registrar() {
    const [valoresInputs, setValoresInputs] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValoresInputs({ ...valoresInputs, [name]: value });
    };

    const registrar = async (event) => {
        event.preventDefault();
        setLoading(true);
        const exitoso = await registrarse(valoresInputs);
        setLoading(false);
        if (exitoso) navigate('/Login');
    };

    return (
        <div className='body'>
            <div className="login-light"></div>
            <div className="login-box">
                <form>
                    <input type="checkbox" className="input-check" id="input-check" />
                    <label htmlFor="input-check" className="toggle">
                        <span className="text off">off</span>
                        <span className="text on">on</span>
                    </label>
                    <div className="light"></div>
                    <h2>Regístrate</h2>
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input type="email" required name='username' autoComplete="off" onChange={handleInputChange} />
                        <label>Email</label>
                        <div className="input-line"></div>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="password" required name='password' autoComplete="new-password" onChange={handleInputChange} />
                        <label>Contraseña</label>
                        <div className="input-line"></div>
                    </div>
                    <br />
                    <button onClick={registrar} className="buton" disabled={loading}>
                        {loading ? 'Cargando...' : 'Regístrate'}
                    </button>
                    <div className="register-link">
                        <p>¿Ya tienes Cuenta? <Link to='/Perfil'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

async function registrarse(valores) {
    try {
        const url = "http://localhost:8080/Api/Client/save";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valores),
        });

        if (response.status === 201) {
            alert('Se ha registrado correctamente');
            return true;
        } else if (response.status === 409) {
            alert('El usuario ya existe');
            return false;
        } else {
            alert('Algo ha salido mal');
            return false;
        }
    } catch (error) {
        console.error('Error al registrarse:', error);
        alert('Hubo un problema con el servidor.');
        return false;
    }
}

export default Registrar;
