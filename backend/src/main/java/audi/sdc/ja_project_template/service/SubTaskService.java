package audi.sdc.ja_project_template.service;

import audi.sdc.ja_project_template.model.SubTask;
import audi.sdc.ja_project_template.model.Task;
import audi.sdc.ja_project_template.repository.SubTaskRepository;
import audi.sdc.ja_project_template.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class SubTaskService {

    private SubTaskRepository subTaskRepository;
    private final TaskRepository taskRepository;

    @Autowired
    public SubTaskService(SubTaskRepository subTaskRepository, TaskRepository taskRepository) {
        this.subTaskRepository = subTaskRepository;
        this.taskRepository = taskRepository;
    }

    public List<SubTask> findAllSubTasks() {
        return subTaskRepository.findAll();
    }

    public List<SubTask> findByName(String name) {
        return subTaskRepository.findByName(name);
    }

    public Optional<SubTask> findById(Long id) {
        return subTaskRepository.findById(id);
    }

    public List<SubTask> findSubTasksByTaskId(Long taskId) {
        return taskRepository.findById(taskId)
                .map(Task::getSubtasks)
                .orElse(Collections.emptyList());
    }

    public List<SubTask> findByCompleted(boolean completed) {
        return subTaskRepository.findByCompleted(completed);
    }

    public SubTask createSubTask(SubTask subTask) {
        return subTaskRepository.save(subTask);
    }

    public SubTask updateSubTask(SubTask subTask) {
        return subTaskRepository.save(subTask);
    }

    public void deleteSubTaskById(Long id) {
        subTaskRepository.deleteById(id);
    }
}
