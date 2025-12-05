-- Database: db_boxletter

-- DROP DATABASE IF EXISTS db_boxletter;

/*CREATE DATABASE db_boxletter
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;*/ 

	CREATE TABLE users
		(
			userID SERIAL PRIMARY KEY,
			firstname VARCHAR(50),
			lastname VARCHAR(50),
			email VARCHAR(20),
			mdp VARCHAR(255),
			role VARCHAR(10)
		);

	CREATE TABLE movies
	(
		moviesID SERIAL PRIMARY KEY,
		titre VARCHAR(30),
		genre VARCHAR(30),
		rate INTEGER,
		userID INTEGER REFERENCES users(userID)
	); 


CREATE TABLE IF NOT EXISTS ratings
(
    ratingID SERIAL PRIMARY KEY,
    moviesID INTEGER REFERENCES movies(moviesID) ON DELETE CASCADE,
    userID INTEGER REFERENCES users(userID) ON DELETE CASCADE,
    rate INTEGER CHECK (rate >= 1 AND rate <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(moviesID, userID)
);

CREATE OR REPLACE VIEW movie_ratings AS
SELECT 
    m.moviesID,
    m.titre,
    m.genre,
    COUNT(r.ratingID) as total_ratings
	FROM movies m
	LEFT JOIN ratings r ON m.moviesID = r.moviesID
	GROUP BY m.moviesID, m.titre, m.genre;

	



	  
