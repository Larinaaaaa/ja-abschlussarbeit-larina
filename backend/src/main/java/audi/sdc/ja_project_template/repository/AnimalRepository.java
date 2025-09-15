package audi.sdc.ja_project_template.repository;

//import audi.sdc.ja_project_template.model.Animal;
import audi.sdc.ja_project_template.model.exception.DatabaseException;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

//@Component
//public class AnimalRepository {
//
//    // TODO: use your prefered database connector (mySQL or SQLite) here:
////    private final DatabaseConnectorMySql dbConnector;
//    private final DatabaseConnectorSqLite dbConnector;
//
//    public AnimalRepository() {
//        // TODO: use your prefered database connector (mySQL or SQLite) here:
////        this.dbConnector = new DatabaseConnectorMySql();
//        this.dbConnector = new DatabaseConnectorSqLite();
//    }
//
//    public Set<Animal> getAll() throws DatabaseException {
//        // First, write the query we want to use. In this case we just want to have all people from the database:
//        String selectStatement = "SELECT * FROM animal;";
//
//        try (PreparedStatement query = dbConnector.getConnection().prepareStatement(selectStatement)) {
//            ResultSet resultSet = query.executeQuery();
//            Set<Animal> animals = new HashSet<>();
//            // With the help of the result set, you can iterate over each row and access the attributes.
//            while (resultSet.next()) {
//                Animal animal = extractFromResultSet(resultSet);
//                animals.add(animal);
//            }
//            return animals;
//        } catch (SQLException e) {
//            System.err.println("Connection to database failed. Try again later");
//            System.err.println(e.getMessage());
//            throw new DatabaseException("Connection to database failed. Try again later", e);
//        }
//    }
//
//    public Animal getById(int id) throws DatabaseException, NotPersistedException {
//        String selectStatement = "SELECT * FROM animal WHERE id = ?;";
//
//        try (PreparedStatement query = dbConnector.getConnection().prepareStatement(selectStatement)) {
//            query.setInt(1, id);
//            ResultSet resultSet = query.executeQuery();
//            Set<Animal> animals = resultSetToAnimals(resultSet);
//
//            return switch (animals.size()) {
//                case 0 -> throw new NotPersistedException();
//                case 1 -> animals.iterator().next();
//                default ->
//                        throw new IllegalStateException("Conflict. Found " + animals.size() + " animals for ID " + id);
//            };
//
//        } catch (SQLException e) {
//            System.err.println("Connection to database failed. Try again later");
//            throw new DatabaseException("Connection to database failed. Try again later", e);
//        }
//    }
//
//    public Set<Animal> getByName(String name) throws DatabaseException {
//        String selectStatement = "SELECT * FROM animal WHERE name = ?;";
//
//        try (PreparedStatement query = dbConnector.getConnection().prepareStatement(selectStatement)) {
//            query.setString(1, name);
//            ResultSet resultSet = query.executeQuery();
//            Set<Animal> animals = new HashSet<>();
//            while (resultSet.next()) {
//                Animal animal = extractFromResultSet(resultSet);
//                animals.add(animal);
//            }
//            return animals;
//        } catch (SQLException e) {
//            System.err.println("Connection to database failed. Try again later");
//            throw new DatabaseException("Connection to database failed. Try again later", e);
//        }
//    }
//
//    public Animal save(Animal animal) throws DatabaseException {
//        String insertStatement = "INSERT INTO animal(name, number_of_legs) VALUES (?, ?);";
//
//        try (PreparedStatement query = dbConnector.getConnection().prepareStatement(insertStatement, PreparedStatement.RETURN_GENERATED_KEYS)) {
//            query.setString(1, animal.name());
//            query.setInt(2, animal.numberOfLegs());
//
//            query.executeUpdate();
//            ResultSet generatedKeys = query.getGeneratedKeys();
//            generatedKeys.next();
//
//            return new Animal(generatedKeys.getInt(1), animal.name(), animal.numberOfLegs());
//        } catch (SQLException e) {
//            System.err.println("Connection to database failed. Try again later");
//            throw new DatabaseException("Connection to database failed. Try again later", e);
//        }
//    }
//
//    public boolean update(Animal animal) throws DatabaseException {
//        String updateStatement = "UPDATE animal SET name = ?, number_of_legs = ? WHERE id = ?";
//        try (PreparedStatement query = dbConnector.getConnection().prepareStatement(updateStatement)) {
//            query.setString(1, animal.name());
//            query.setInt(2, animal.numberOfLegs());
//            query.setInt(3, animal.id());
//
//            return query.executeUpdate() > 0;
//        } catch (SQLException e) {
//            System.err.println("Connection to database failed. Try again later");
//            throw new DatabaseException("Connection to database failed. Try again later", e);
//        }
//    }
//
//    public boolean delete(Integer id) throws DatabaseException {
//        String deleteStatement = "DELETE FROM animal WHERE id = ?;";
//        try (PreparedStatement query = dbConnector.getConnection().prepareStatement(deleteStatement)) {
//            query.setInt(1, id);
//            return query.executeUpdate() > 0;
//        } catch (SQLException e) {
//            System.err.println("Connection to database failed. Try again later");
//            throw new DatabaseException("Connection to database failed. Try again later", e);
//        }
//    }
//
//    private Animal extractFromResultSet(ResultSet resultSet) throws SQLException {
//        try {
//            int id = resultSet.getInt("id");
//            String name = resultSet.getString("name");
//            int numberOfLegs = resultSet.getInt("number_of_legs");
//
//            return new Animal(id, name, numberOfLegs);
//        } catch (SQLException e) {
//            System.err.println("Could not extract animal from ResultSet");
//            throw new DatabaseException("Could not extract animal from ResultSet", e);
//        }
//    }
//
//    private Set<Animal> resultSetToAnimals(ResultSet resultSet) throws SQLException {
//        Set<Animal> animals = new HashSet<>();
//        while (resultSet.next()) {
//            Animal animal = extractFromResultSet(resultSet);
//            animals.add(animal);
//        }
//        return animals;
//    }
//}