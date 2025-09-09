package audi.sdc.ja_project_template.repository;

import audi.sdc.ja_project_template.model.SubTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SubTaskRepository extends JpaRepository<SubTask, Integer> {
    Set<SubTask> findByName(String name);
}
