CREATE DATABASE IF NOT EXISTS akpsi_portal;

USE akpsi_portal;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    identikey VARCHAR(8) UNIQUE NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    hashed_password VARCHAR(255),
    total_points INT DEFAULT 0,
    needed_points INT DEFAULT 52,
    points_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
