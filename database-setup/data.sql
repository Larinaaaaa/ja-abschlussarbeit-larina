CREATE DATABASE IF NOT EXISTS template_db;
GRANT ALL PRIVILEGES ON template_db.* TO 'accessUser'@'%' IDENTIFIED BY 'accessPassword';
FLUSH PRIVILEGES;

USE template_db;

DROP TABLE IF EXISTS animal;

CREATE TABLE IF NOT EXISTS animal
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(100),
    number_of_legs INT
);

INSERT INTO animal (name, number_of_legs)
VALUES ('Dog', 4),
       ('Penguin', 2),
       ('Spider', 8),
       ('Ladybug', 6);