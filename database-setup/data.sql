-- Datenbank erstellen und Benutzerrechte setzen
CREATE DATABASE IF NOT EXISTS tracker_db;

USE tracker_db;

# GRANT ALL PRIVILEGES ON tracker_db.* TO 'accessUser'@'%' IDENTIFIED BY 'accessPassword';
# FLUSH PRIVILEGES;

-- Alte Tabellen entfernen
DROP TABLE IF EXISTS subtask;
DROP TABLE IF EXISTS task;

-- Neue Tabellen erstellen (Entity-konform)
CREATE TABLE task (
                      id          INT PRIMARY KEY AUTO_INCREMENT,
                      name        VARCHAR(255) NOT NULL,
                      created     DATE,
                      due_date    DATE,
                      details     TEXT,
                      category    VARCHAR(100),
                      priority    VARCHAR(100),
                      complexity  VARCHAR(100),
                      status      VARCHAR(100)
);

CREATE TABLE subtask (
                         id        INT PRIMARY KEY AUTO_INCREMENT,
                         name      VARCHAR(255) NOT NULL,
                         details   TEXT,
                         completed BOOLEAN,
                         task_id   INT,
                         FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
);

-- Beispieldaten einfügen
INSERT INTO task (name, created, due_date, details, category, priority, complexity, status)
VALUES
    ('Projekt vorbereiten', '2025-09-03', '2025-09-15',
     'Projektplan erstellen und Ressourcen klären', 'Work', 'High', 'Medium', 'OPEN'),

    ('Dokumentation schreiben', '2025-09-04', '2025-09-20',
     'Technische Dokumentation erstellen', 'Work', 'Medium', 'Low', 'OPEN');

INSERT INTO subtask (name, details, completed, task_id)
VALUES
    ('Projektplan schreiben', 'Dokumentation in Confluence', FALSE, 1),
    ('Kickoff Meeting', 'Team einladen', FALSE, 1),
    ('API-Dokumentation erstellen', 'Endpoints dokumentieren', FALSE, 2),
    ('Review durchführen', 'Dokumentation prüfen lassen', FALSE, 2);
