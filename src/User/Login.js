import './Styles/Login.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [valoresInputs, setValoresInputs] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValoresInputs({ ...valoresInputs, [name]: value });
    };

    const login = async (event) => {
        event.preventDefault();
        if (!valoresInputs.username || !valoresInputs.password) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        setLoading(true);
        const exito = await logearse(valoresInputs);
        setLoading(false);
        if (exito) {
            navigate('/Cartelera');
        }
    };

    return (
        <div className="login-container">
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
                        <h2>Login</h2>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input
                                type="email"
                                autoComplete='off'
                                required
                                name="username"
                                onChange={handleInputChange}
                            />
                            <label>Email</label>
                            <div className="input-line"></div>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input
                                type="password"
                                required
                                name="password"
                                onChange={handleInputChange}
                            />
                            <label>Contraseña</label>
                            <div className="input-line"></div>
                        </div>
                        <button onClick={login} className='buton' disabled={loading}>
                            {loading ? 'Cargando...' : 'Login'}
                        </button>
                        <div className="register-link">
                            <p>No tienes Cuenta? <Link to='/Registrar'>Regístrate</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    async function logearse(valores) {
        try {
            const response = await fetch("http://localhost:8080/Api/Auth/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valores)
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                return true;
            } else if (response.status === 404) {
                alert('El usuario no existe');
                return false;
            } else if (response.status === 401) {
                alert("La contraseña es incorrecta");
                return false;
            } else {
                alert("Algo ha salido mal");
                return false;
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Hubo un problema con el servidor.');
            return false;
        }
    }
}

export default Login;
