package audi.sdc.ja_project_template.repository;

import audi.sdc.ja_project_template.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    Set<Task> findByCategory(String category);
    Set<Task> findByName(String name);
    Set<Task> findById(int id);
}
