package audi.sdc.ja_project_template;

import audi.sdc.ja_project_template.repository.DatabaseConnectorSqLite;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        try {
            new DatabaseConnectorSqLite().setupDatabase();
        } catch (ClassNotFoundException e) {
            System.err.println(e.getMessage());
        }
    }
}
