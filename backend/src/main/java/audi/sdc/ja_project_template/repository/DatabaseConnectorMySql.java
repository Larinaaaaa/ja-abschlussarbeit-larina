package audi.sdc.ja_project_template.repository;

import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

// To access a database you have to use the DriverManager in the package java.sql. The DriverManager has a static
// method getConnection, you can use to establish a connection to a database.
//
// getConnection requires the following information:
// - the url to the database
// - username
// - password
//
// The url has the following syntax: jdbc:<driver>://<ip-address>:<port>/<database_name>
// - jdbc is the api we are using to connect to the database
// - the driver is the specific implementation. Because we are using mariadb, the driver is always mysql
// - the ip-address of the database - when the database is running on your machine, the address is always localhost
// - the port of the address - if you haven't changed the port, it is 3306
// - the database name - in the example it is quiz_db, but this depends on the project

// Database connections should be closed, when they are no longer needed. When you are not closing a database connection
// the allocated resources are not released. In this example it is not really troublesome, but when we start to develop
// server applications, not closing a connection can cause serious issues. For example, the server app can no longer
// establish a database connection or can become unstable.

// Luckily you don't need to care too much about closing a connection. Java provides us a mechanism to auto-close
// connections. The mechanism is called: try-with-resources. Try-with-resources accepts object that implements the
// interface AutoCloseable and will close those objects when an exception occurs or the programm finishs the scope.

// Try-with-resources uses the following syntax:
// try (<object_type> <variable_name>) {} - e.g. try(FileInputStream file = new FileInputStream("hallo")) {}
//
// You can even use close multiple objects, each separated by a colon:
// try (<object_type> <variable_name>; <object_type> <variable_name>)
// e.g. try(FileInputStream file = new FileInputStream("hallo"); FileInputStream file = new FileInputStream("welt"))


// To sum everything up, here is the final piece of code to connect to our database:
@Component
public class DatabaseConnectorMySql {

    private static final String DATABASE_NAME = "template_db";
    private static final String USER = "accessUser";
    private static final String PASSWORD = "accessPassword";

    public Connection getConnection() throws SQLException {
        return DriverManager
                .getConnection("jdbc:mysql://localhost:3306/" + DATABASE_NAME, USER, PASSWORD);
    }
}
