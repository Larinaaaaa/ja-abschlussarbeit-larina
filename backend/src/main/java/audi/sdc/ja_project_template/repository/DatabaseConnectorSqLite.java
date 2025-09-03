package audi.sdc.ja_project_template.repository;

import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseConnectorSqLite {

    public static final String DROP_TABLE_STATEMENT = "DROP TABLE IF EXISTS task;";
    public static final String CREATE_TASK_TABLE_STATEMENT = """
        CREATE TABLE IF NOT EXISTS task
        (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            name          TEXT NOT NULL,
            created       TEXT,
            dueDate       TEXT,
            details       TEXT,
            category      TEXT,
            priority      TEXT,
            complexity    TEXT,
            status        TEXT
        );"""; String INSERT_TASK_STATEMENT = """
            INSERT INTO task (name, created, dueDate, details, category, priority, complexity, status)
            VALUES
                ('Projekt vorbereiten', '2025-09-03', '2025-09-15', 'Projektplan erstellen und Ressourcen klären', 'Work', 'High', 'Medium', 'OPEN'),
                ('Dokumentation schreiben', '2025-09-04', '2025-09-20', 'Technische Dokumentation erstellen', 'Work', 'Medium', 'Low', 'OPEN');
            """;


    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection("jdbc:sqlite:database-setup/sample.db");
    }

    public void setupDatabase() throws ClassNotFoundException {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection("jdbc:sqlite:database-setup/sample.db");
            Statement statement = connection.createStatement();

            statement.executeUpdate(DROP_TABLE_STATEMENT);
            statement.executeUpdate(CREATE_TASK_TABLE_STATEMENT);
            statement.executeUpdate(INSERT_TASK_STATEMENT);
        } catch (SQLException e) {
            // if the error message is "out of memory",
            // it probably means no database file is found
            System.err.println(e.getMessage());
        } finally {
            try {
                if (connection != null)
                    connection.close();
            } catch (SQLException e) {
                System.err.println(e.getMessage());
            }
        }
    }

    public static void main(String[] args) throws ClassNotFoundException {
        // this is only for test reasons, to use the DB in your app, take a look into the Application runner
        Class.forName("org.sqlite.JDBC");
        new DatabaseConnectorSqLite().setupDatabase();
    }
}
