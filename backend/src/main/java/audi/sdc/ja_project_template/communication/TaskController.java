package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.*;
import audi.sdc.ja_project_template.model.enums.Category;
import audi.sdc.ja_project_template.model.enums.Complexity;
import audi.sdc.ja_project_template.model.enums.Priority;
import audi.sdc.ja_project_template.model.enums.Status;
import audi.sdc.ja_project_template.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.findAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTasksById(@PathVariable Long id) {
        return taskService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name")
    public List<Task> getTasksByName(@RequestParam String name) {
        return taskService.findByName(name);
    }

    @GetMapping("/category")
    public List<Task> getTasksByCategory(@RequestParam Category category) {
        return taskService.findByCategory(category);
    }

    @GetMapping("/priority")
    public List<Task> getTasksByPriority(@RequestParam Priority priority) {
        return taskService.findByPriority(priority);
    }

    @GetMapping("/complexity")
    public List<Task> getTasksByComplexity(@RequestParam Complexity complexity) {
        return taskService.findByComplexity(complexity);
    }

    @GetMapping("/status")
    public List<Task> getTasksByStatus(@RequestParam Status status) {
        return taskService.findByStatus(status);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) throws URISyntaxException {
        task.setCreated(LocalDate.now());
        if (task.getStatus() == null) {
            task.setStatus(Status.OPEN);
        }
        Task response = this.taskService.createTask(task);
        return ResponseEntity.created(new URI("http://localhost:8080/api/tasks/" + response.getId()))
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskService.findById(id)
                .map(existingTask -> {
                    existingTask.setName(updatedTask.getName());
                    existingTask.setDueDate(updatedTask.getDueDate());
                    existingTask.setDetails(updatedTask.getDetails());
                    existingTask.setCategory(updatedTask.getCategory());
                    existingTask.setPriority(updatedTask.getPriority());
                    existingTask.setComplexity(updatedTask.getComplexity());
                    existingTask.setStatus(updatedTask.getStatus());
                    Task saved = taskService.updateTask(existingTask);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskService.findById(id).isPresent()) {
            taskService.deleteTaskById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
