import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./main.css";

export default function Main() {
    const [movies, setMovies] = useState([]);
    const [userRatings, setUserRatings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterGenre, setFilterGenre] = useState('all');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }
        fetchMovies();
    }, [navigate, userId]);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/movies');
            const data = await response.json();

            if (data.success) {
                setMovies(data.movies);
                data.movies.forEach(movie => fetchUserRating(movie.moviesid));
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

    const fetchUserRating = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/ratings/${movieId}/${userId}`);
            const data = await response.json();

            if (data.success && data.rating) {
                setUserRatings(prev => ({
                    ...prev,
                    [movieId]: data.rating.rate
                }));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la note:', error);
        }
    };

    const handleRate = async (movieId, rate) => {
        try {
            const response = await fetch('http://localhost:3001/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: parseInt(movieId),
                    userId: parseInt(userId),
                    rate: parseInt(rate)
                })
            });

            const data = await response.json();

            if (data.success) {
                setUserRatings(prev => ({
                    ...prev,
                    [movieId]: rate
                }));
                fetchMovies();
            } else {
                alert(data.message || 'Erreur lors de la notation');
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

    const genres = ['all', ...new Set(movies.map(m => m.genre))];
    const filteredMovies = filterGenre === 'all' 
        ? movies 
        : movies.filter(m => m.genre === filterGenre);

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="main-container">
            <header className="main-header">
                <h1>🎬 BoxLetter</h1>
                <button onClick={handleLogout} className="btn-logout">
                    Déconnexion
                </button>
            </header>

            {error && <p className="error-message">{error}</p>}

            <div className="filter-section">
                <label htmlFor="genre-filter">Filtrer par genre :</label>
                <select 
                    id="genre-filter"
                    value={filterGenre} 
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="genre-select"
                >
                    {genres.map(genre => (
                        <option key={genre} value={genre}>
                            {genre === 'all' ? 'Tous les genres' : genre}
                        </option>
                    ))}
                </select>
            </div>

            {filteredMovies.length === 0 ? (
                <p className="no-movies">Aucun film disponible pour le moment.</p>
            ) : (
                <div className="movies-grid">
                    {filteredMovies.map((movie) => (
                        <div key={movie.moviesid} className="movie-card">
                            <div className="movie-header">
                                <h3 className="movie-title">{movie.titre}</h3>
                            </div>

                            <div className="movie-genre">
                                <span className="genre-badge">{movie.genre}</span>
                            </div>

                            {movie.description && (
                                <p className="movie-description">{movie.description}</p>
                            )}

                            <div className="movie-stats">
                                <div className="average-rating">
                                    <span className="rating-label">Note moyenne :</span>
                                    <span className="rating-value">
                                        {movie.total_ratings > 0 
                                            ? `${parseFloat(movie.average_rating).toFixed(1)}/5` 
                                            : 'Pas encore noté'}
                                    </span>
                                    {movie.total_ratings > 0 && (
                                        <span className="votes-count">
                                            ({movie.total_ratings} {movie.total_ratings > 1 ? 'votes' : 'vote'})
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="rating-section">
                                <p className="rating-label">Votre note :</p>
                                <div className="rating-buttons">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => handleRate(movie.moviesid, star)}
                                            className={`rating-btn ${userRatings[movie.moviesid] === star ? 'active' : ''}`}
                                            title={`Noter ${star}/5`}
                                        >
                                            {star}
                                        </button>
                                    ))}
                                </div>
                                {userRatings[movie.moviesid] && (
                                    <p className="user-rating-text">
                                        Vous avez noté : {userRatings[movie.moviesid]}/5
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}