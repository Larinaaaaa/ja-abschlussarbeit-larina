package audi.sdc.ja_project_template.repository;

import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseConnectorSqLite {

    public static final String DROP_TABLE_STATEMENT = "DROP TABLE IF EXISTS animal;";
    public static final String CREATE_TABLE_STATEMENT = """
            CREATE TABLE IF NOT EXISTS animal
            (
                id            INTEGER PRIMARY KEY,
                name          VARCHAR(100),
                number_of_legs INTEGER
            );""";
    public static final String INSERT_INTO_STATEMENT = """ 
            INSERT INTO animal (name, number_of_legs)
            VALUES ('Dog', 4),
                   ('Penguin', 2),
                   ('Spider', 8),
                   ('Ladybug', 6);
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
            statement.executeUpdate(CREATE_TABLE_STATEMENT);
            statement.executeUpdate(INSERT_INTO_STATEMENT);
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
