import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./admin.css";

export default function Admin() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userType = localStorage.getItem('type');
        if (userType !== 'admin') {
            navigate('/login');
            return;
        }
        fetchMovies();
    }, [navigate]);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/movies');
            const data = await response.json();
            
            if (data.success) {
                setMovies(data.movies);
            } else {
                setError('Erreur lors du chargement des films');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (movieId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce film ?')) {
            return;
        }

        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://localhost:3001/api/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: Number.parseInt(userId) })
            });

            const data = await response.json();

            if (data.success) {
                setMovies(movies.filter(movie => movie.moviesid !== movieId));
            } else {
                alert(data.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Dashboard Admin</h1>
                <div className="header-actions">
                    <Link to="/movies" className="btn-add">
                        + Ajouter un film
                    </Link>
                    <button onClick={handleLogout} className="btn-logout">
                        Déconnexion
                    </button>
                </div>
            </header>

            {error && <p className="error-message">{error}</p>}

            <div className="movies-section">
                <h2>Liste des films ({movies.length})</h2>

                {movies.length === 0 ? (
                    <p className="no-movies">Aucun film n'a été ajouté pour le moment.</p>
                ) : (
                    <div className="movies-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Genre</th>
                                    <th>Note moyenne</th>
                                    <th>Nombre de votes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie) => (
                                    <tr key={movie.moviesid}>
                                        <td className="movie-title">{movie.titre}</td>
                                        <td>{movie.genre}</td>
                                        <td>
                                            <span className="rating-badge">
                                                {movie.total_ratings > 0 
                                                    ? `${Number.parseFloat(movie.average_rating).toFixed(1)}/5` 
                                                    : 'Non noté'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="votes-badge">
                                                {movie.total_ratings || 0}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(movie.moviesid)}
                                                className="btn-delete"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}