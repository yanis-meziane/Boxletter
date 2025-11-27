const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'db_boxletter',
  password: 'SkyPepito2025',
  port: 5433,
});

// Test de connexion
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à la DB:', err);
  } else {
    console.log('Vous êtes bien connecté à PostgreSQL');
    release();
  }
});
app.post('/api/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const role = req.body.role || 'user';
  
  try {
    const checkUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (firstname, lastname, email, mdp, role) VALUES ($1, $2, $3, $4, $5) RETURNING userid, firstname, lastname, email, role',
      [firstname, lastname, email, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Route de connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT userid, firstname, lastname, email, mdp, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.mdp);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    return res.status(200).json({
      success: true,
      type: user.role,
      userId: user.userid,
      firstname: user.firstname
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

app.post('/api/movies', async (req, res) => {
  const { titre, genre, rate, userId, description} = req.body;

  try {

    const userCheck = await pool.query(
      'SELECT role FROM users WHERE userid = $1',
      [userId]
    );

    if (userCheck.rows.length === 0 || userCheck.rows[0].role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Seuls les admins peuvent ajouter des films.'
      });
    }

    const result = await pool.query(
      'INSERT INTO movies (titre, genre, rate, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [titre, genre, rate, description]
    );

    res.status(201).json({
      success: true,
      message: 'Film ajouté avec succès',
      movie: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

app.get('/api/movies', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        m.moviesid,
        m.titre,
        m.genre,
        m.rate
        COUNT(r.ratingid) as total_ratings
      FROM movies m
      GROUP BY m.moviesid, m.titre, m.genre, m.created_at
      ORDER BY m.created_at DESC
    `);

    res.json({
      success: true,
      movies: result.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const userCheck = await pool.query(
      'SELECT role FROM users WHERE userid = $1',
      [userId]
    );

    if (userCheck.rows.length === 0 || userCheck.rows[0].role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé.'
      });
    }

    const result = await pool.query(
      'DELETE FROM movies WHERE moviesid = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Film non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Film supprimé avec succès'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

app.post('/api/ratings', async (req, res) => {
  const { movieId, userId, rate } = req.body;

  try {
    const existingRating = await pool.query(
      'SELECT * FROM ratings WHERE moviesid = $1 AND userid = $2',
      [movieId, userId]
    );

    if (existingRating.rows.length > 0) {
      const result = await pool.query(
        'UPDATE ratings SET rate = $1 WHERE moviesid = $2 AND userid = $3 RETURNING *',
        [rate, movieId, userId]
      );

      return res.json({
        success: true,
        message: 'Note mise à jour',
        rating: result.rows[0]
      });
    }

    const result = await pool.query(
      'INSERT INTO ratings (moviesid, userid, rate) VALUES ($1, $2, $3) RETURNING *',
      [movieId, userId, rate]
    );

    res.status(201).json({
      success: true,
      message: 'Film noté avec succès',
      rating: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Récupérer la note d'un utilisateur pour un film
app.get('/api/ratings/:movieId/:userId', async (req, res) => {
  const { movieId, userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM ratings WHERE moviesid = $1 AND userid = $2',
      [movieId, userId]
    );

    res.json({
      success: true,
      rating: result.rows[0] || null
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement' });
});

app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});