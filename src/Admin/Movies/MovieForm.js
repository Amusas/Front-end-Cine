import React, { useState} from 'react';
import './Style/MovieForm.css';

const MovieForm = ({ onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [coupon, setCoupon] = useState(initialData?.coupon || '');
    const [genre, setGenre] = useState(initialData?.genre || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [image, setImage] = useState(initialData?.image || '');
    const [schedule, setSchedule] = useState(initialData?.schedule || []);
    const [selectedTime, setSelectedTime] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Crear un FormData para enviar datos y archivos
        const formData = new FormData();
        formData.append('titulo', title);
        formData.append('descripsion', description);
        formData.append('cupon', coupon);
        formData.append('genero', genre);
        formData.append('precio', price);
        formData.append('horario', JSON.stringify(schedule)); // Convertir a JSON porque es un array
        if (image) {
            formData.append('imagen', image); // Asegurarse de enviar el archivo real
        }
    
        try {
            const response = await fetch('/api/movies', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                alert('Película guardada con éxito');
                // Aquí puedes reiniciar el formulario si lo deseas
                setTitle('');
                setDescription('');
                setCoupon('');
                setGenre('');
                setPrice('');
                setImage('');
                setSchedule([]);
            } else {
                const errorData = await response.json();
                alert(`Error al guardar: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Hubo un error al guardar los datos.');
        }
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleAddTime = () => {
        if (selectedTime && !schedule.includes(selectedTime)) {
            setSchedule([...schedule, selectedTime]);
            setSelectedTime('');
        }
    };

    const handleRemoveTime = (time) => {
        setSchedule(schedule.filter(t => t !== time));
    };

    return (
        <form onSubmit={handleSubmit} className="movie-form">
            <label>
                Título:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                 <div className="input-line"></div>
            </label>
            <label>
                Descripción:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                 <div className="input-line"></div>
            </label>
            <label>
                Cupón de Descuento:
                <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                />
            </label>
            <div className="input-line"></div>
            <label>
                Género:
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option value="">Seleccionar género</option>
                        <option value="Accion">Accion</option>
                        <option value="Drama">Drama</option>
                </select>
                <div className="input-line"></div>
            </label>
            <label>
                Precio de Entrada:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                 <div className="input-line"></div>
            </label>
            <label>
                Imagen:
                <input
                    type="file"
                    onChange={handleImageChange}
                />
                {image && <img src={image} alt="Movie" className="preview-image" />}
            </label>
            <label>
                Programación:
                <div className="schedule-input">
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    <button type="button" onClick={handleAddTime}>Agregar</button>
                </div>
                <ul className="schedule-list">
                    {schedule.map((time, index) => (
                        <li key={index}>
                            {time}
                            <button type="button" onClick={() => handleRemoveTime(time)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <div className="input-line"></div>
            </label>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default MovieForm;
