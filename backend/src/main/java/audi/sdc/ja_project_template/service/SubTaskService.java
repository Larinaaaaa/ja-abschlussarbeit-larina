package audi.sdc.ja_project_template.service;

import audi.sdc.ja_project_template.model.SubTask;
import audi.sdc.ja_project_template.repository.SubTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class SubTaskService {

    private SubTaskRepository subTaskRepository;

    @Autowired
    public SubTaskService(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    public List<SubTask> findAllSubTasks() {
        return subTaskRepository.findAll();
    }

    public List<SubTask> findByName(String name) {
        return subTaskRepository.findByName(name);
    }

    public List<SubTask> findSubTaskById(Integer id) {
        return subTaskRepository.findByTaskId(id);
    }

    public List<SubTask> findByCompleted(boolean completed) {
        return subTaskRepository.findByCompleted(completed);
    }

    public SubTask createTask(SubTask subTask) {
        return subTaskRepository.save(subTask);
    }

    public SubTask updateTask(SubTask subTask) {
        return subTaskRepository.save(subTask);
    }

    public void deleteSubTaskById(int id) {
        subTaskRepository.deleteById(id);
    }
}
