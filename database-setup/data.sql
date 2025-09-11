-- Datenbank erstellen und Berechtigungen setzen
DROP DATABASE IF EXISTS template_db;
CREATE DATABASE IF NOT EXISTS tracker_db;
GRANT ALL PRIVILEGES ON tracker_db.* TO 'accessUser'@'%' IDENTIFIED BY 'accessPassword';
FLUSH PRIVILEGES;

USE tracker_db;

-- Neue Tabellen erstellen
DROP TABLE IF EXISTS subtask;
DROP TABLE IF EXISTS task;

CREATE TABLE IF NOT EXISTS task (
                                    id            INT PRIMARY KEY AUTO_INCREMENT,
                                    name          VARCHAR(255) NOT NULL,
    created       VARCHAR(255),
    dueDate       VARCHAR(255),
    details       TEXT,
    category      VARCHAR(100),
    priority      VARCHAR(100),
    complexity    VARCHAR(100),
    status        VARCHAR(100)
    );

CREATE TABLE IF NOT EXISTS subtask (
                                       id        INT PRIMARY KEY AUTO_INCREMENT,
                                       name      VARCHAR(255) NOT NULL,
    details   TEXT,
    completed TINYINT,
    task_id   INT,
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
    );

-- Daten einfügen
INSERT INTO task (name, created, dueDate, details, category, priority, complexity, status)
VALUES
    ('Projekt vorbereiten', '2025-09-03', '2025-09-15', 'Projektplan erstellen und Ressourcen klären', 'Work', 'High', 'Medium', 'OPEN'),
    ('Dokumentation schreiben', '2025-09-04', '2025-09-20', 'Technische Dokumentation erstellen', 'Work', 'Medium', 'Low', 'OPEN');

INSERT INTO subtask (name, details, completed, task_id)
VALUES
    ('Projektplan schreiben', 'Dokumentation in Confluence', 0, 1),
    ('Kickoff Meeting', 'Team einladen', 0, 1),
    ('API-Dokumentation erstellen', 'Endpoints dokumentieren', 0, 2),
    ('Review durchführen', 'Dokumentation prüfen lassen', 0, 2);
