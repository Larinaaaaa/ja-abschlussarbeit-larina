package audi.sdc.ja_project_template.repository;

import audi.sdc.ja_project_template.model.*;
import audi.sdc.ja_project_template.model.enums.Category;
import audi.sdc.ja_project_template.model.enums.Complexity;
import audi.sdc.ja_project_template.model.enums.Priority;
import audi.sdc.ja_project_template.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCategory(Category category);
    List<Task> findByName(String name);
    List<Task> findByStatus(Status status);
    List<Task> findByPriority(Priority priority);
    List<Task> findByComplexity(Complexity complexity);
}
