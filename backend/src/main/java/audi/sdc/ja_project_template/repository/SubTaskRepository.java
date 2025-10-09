package audi.sdc.ja_project_template.repository;

import audi.sdc.ja_project_template.model.SubTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTaskRepository extends JpaRepository<SubTask, Long> {
    List<SubTask> findByName(String name);
    List<SubTask> findByTask_Id(Long taskId);
    List<SubTask> findByCompleted(boolean completed);
}
