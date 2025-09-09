package audi.sdc.ja_project_template.service;

import audi.sdc.ja_project_template.model.Task;
import audi.sdc.ja_project_template.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public List<Task> findByName(String name) {
        return (List<Task>) taskRepository.findByName(name);
    }

    public List<Task> findByCategory(String category) {
        return (List<Task>) taskRepository.findByCategory(category);
    }

    public Task findById(int id) {
        return (Task) taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTaskById(int id) {
        taskRepository.deleteById(id);
    }

}