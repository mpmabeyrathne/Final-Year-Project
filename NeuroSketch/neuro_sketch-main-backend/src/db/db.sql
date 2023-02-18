CREATE DATABASE neuro_sketch;
USE neuro_sketch;

CREATE TABLE user(
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    CONSTRAINT PRIMARY KEY (email)
);
SELECT * FROM user;
DESC user;

