DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  repoName VARCHAR(255) NOT NULL,
  repoLanguage VARCHAR(255) NOT NULL,
  repoDescription VARCHAR(255),
  gitAvatar VARCHAR(255) NOT NULL
);