package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.Status;
import audi.sdc.ja_project_template.model.Task;
import audi.sdc.ja_project_template.repository.NotPersistedException;
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
    public List<Task> get(@RequestParam(required = false) String name) {
        if (name == null || name.isEmpty()) {
            return taskService.findAllTasks();
        }
        return this.taskService.findByName(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable Long id) {
        return taskService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task task) throws URISyntaxException {
        task.setCreated(LocalDate.now());
        if (task.getStatus() == null) {
            task.setStatus(Status.OPEN);
        }
        Task response = this.taskService.createTask(task);
        return ResponseEntity.created(new URI("http://localhost:8080/api/tasks/" + response.getId()))
                .body(response);
    }
}

