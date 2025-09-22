package audi.sdc.ja_project_template.repository;

import audi.sdc.ja_project_template.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByCategory(String category);
    List<Task> findByName(String name);
}
