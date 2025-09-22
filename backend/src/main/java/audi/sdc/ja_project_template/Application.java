package audi.sdc.ja_project_template;

//import audi.sdc.ja_project_template.repository.DatabaseConnectorMySql;
//import audi.sdc.ja_project_template.repository.DatabaseConnectorSqLite;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.sql.SQLException;

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
