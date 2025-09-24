package audi.sdc.ja_project_template.repository;

import audi.sdc.ja_project_template.model.SubTask;
import audi.sdc.ja_project_template.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubTaskRepository extends JpaRepository<SubTask, Long> {
    List<SubTask> findByName(String name);
    Optional<Task> findByTaskId(Long taskId);
    List<SubTask> findByCompleted(boolean completed);
}
