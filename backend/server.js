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

// Route d'inscription
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
      type: user.role
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
