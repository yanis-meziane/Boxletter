import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./formFilm.css";

export default function FormFilm() {
    const [formData, setFormData] = useState({
        titre: '',
        genre: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            setError('Vous devez être connecté');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId: parseInt(userId)
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Film ajouté avec succès !');
                setTimeout(() => {
                    navigate('/admin');
                }, 1500);
            } else {
                setError(data.message || 'Erreur lors de l\'ajout du film');
            }

        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        }
    };

    return (
        <div className="form-container">
            <h1>Ajouter un film</h1>

            <form onSubmit={handleSubmit} className="movie-form">
                <div className="form-group">
                    <label htmlFor="titre">Titre du film *</label>
                    <input
                        type="text"
                        name="titre"
                        id="titre"
                        placeholder="Ex: Inception"
                        minLength={1}
                        maxLength={100}
                        value={formData.titre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre *</label>
                    <select
                        name="genre"
                        id="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez un genre</option>
                        <option value="Action">Action</option>
                        <option value="Aventure">Aventure</option>
                        <option value="Comédie">Comédie</option>
                        <option value="Drame">Drame</option>
                        <option value="Horreur">Horreur</option>
                        <option value="Science-Fiction">Science-Fiction</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Animation">Animation</option>
                        <option value="Romance">Romance</option>
                        <option value="Documentaire">Documentaire</option>
                    </select>
                </div>

                <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea
        name="description"
        id="description"
        placeholder="Résumé du film"
        value={formData.description}
        onChange={handleChange}
    />
</div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="form-actions">
                    <button type="submit" className="btn-submit">Ajouter le film</button>
                    <button 
                        type="button" 
                        className="btn-cancel"
                        onClick={() => navigate('/admin')}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}