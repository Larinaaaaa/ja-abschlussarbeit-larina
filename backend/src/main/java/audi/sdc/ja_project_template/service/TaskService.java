package audi.sdc.ja_project_template.service;

import audi.sdc.ja_project_template.model.*;
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

    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> findByName(String name) {
        return taskRepository.findByName(name);
    }

    public List<Task> findByCategory(Category category) {
        return taskRepository.findByCategory(category);
    }

    public List<Task> findByPriority(Priority priority) {
        return taskRepository.findByPriority(priority);
    }

    public List<Task> findByComplexity(Complexity complexity) {
        return taskRepository.findByComplexity(complexity);
    }

    public List<Task> findByStatus(Status status) {
        return taskRepository.findByStatus(status);
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