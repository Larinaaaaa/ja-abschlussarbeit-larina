-- Datenbank erstellen und Benutzerrechte setzen
CREATE DATABASE IF NOT EXISTS tracker_db;

USE tracker_db;

-- Alte Tabellen entfernen
DROP TABLE IF EXISTS subtask;
DROP TABLE IF EXISTS task;

-- Neue Tabellen erstellen
CREATE TABLE task
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    created    DATE,
    due_date   DATE,
    details    TEXT,
    category   VARCHAR(15),
    priority   VARCHAR(15),
    complexity VARCHAR(15),
    status     VARCHAR(15)
);

CREATE TABLE subtask
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    task_id   INT,
    FOREIGN KEY (task_id) REFERENCES task (id) ON DELETE CASCADE
);

-- Statische Daten einfügen
INSERT INTO task (name, created, due_date, details, category, priority, complexity, status)
VALUES ('Projekt vorbereiten', '2025-09-03', '2025-09-15',
        'Projektplan erstellen und Ressourcen klären', 'VS', 'HIGH', 'HIGH', 'DONE'),

       ('Dokumentation schreiben', '2025-09-04', '2025-09-20',
        'Technische Dokumentation erstellen', 'VS', 'MEDIUM', 'MEDIUM', 'OPEN'),

       ('Hybridkurs Aufgaben', '2025-09-04', '2025-09-20',
        'Aufgaben zu Algorithmen erledigen', 'BIZ', 'LOW', 'MEDIUM', 'OPEN'),


       ('TNO schreiben', '2025-09-18', '2025-09-20',
        'Berufsschule nachtragen', 'SONSTIGE', 'LOW', 'LOW', 'OPEN');

INSERT INTO subtask (name, completed, task_id)
VALUES ('Projektplan schreiben', TRUE, 1),
       ('Kickoff Meeting', TRUE, 1),
       ('API-Dokumentation erstellen', FALSE, 2),
       ('Review durchführen', FALSE, 2);
