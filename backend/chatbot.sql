CREATE DATABASE chatbot;
USE chatbot;

CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_input TEXT NOT NULL,
    bot_response TEXT NOT NULL
);
