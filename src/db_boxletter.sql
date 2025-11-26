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

	CREATE TABLE admin 
	(
		adminID SERIAL PRIMARY KEY,
		firstname VARCHAR(50),
		lastname VARCHAR(50), 
		email VARCHAR(20),
		mdp VARCHAR(255)
	);

	INSERT INTO admin VALUES
	(1,'test', 'test', 'test@test.test','admin123');

	CREATE TABLE users
		(
			userID SERIAL PRIMARY KEY,
			firstname VARCHAR(50),
			lastname VARCHAR(50),
			email VARCHAR(20),
			mdp VARCHAR(255)
		)

		INSERT INTO users VALUES
	(1,'test', 'test', 'test@test.test','user123');

	SELECT * FROM admin;
	SELECT * FROM users;

	CREATE TABLE movies
	(
		moviesID SERIAL PRIMARY KEY,
		titre VARCHAR(30),
		genre VARCHAR(30),
		rate INTEGER,
		adminID INTEGER REFERENCES admin(adminID),
		userID INTEGER REFERENCES users(userID)
	);