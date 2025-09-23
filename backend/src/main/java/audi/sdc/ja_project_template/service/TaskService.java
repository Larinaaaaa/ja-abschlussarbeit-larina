package audi.sdc.ja_project_template.service;

import audi.sdc.ja_project_template.model.Task;
import audi.sdc.ja_project_template.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> findByName(String name) {
        return taskRepository.findByName(name);
    }

    public List<Task> findByCategory(String category) {
        return taskRepository.findByCategory(category);
    }

    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }


    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }
}