package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.Task;
import audi.sdc.ja_project_template.repository.NotPersistedException;
import audi.sdc.ja_project_template.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public Set<Task> get(@RequestParam(required = false) String name) {
        if (name == null || name.isEmpty()) {
            return taskService.findAllTasks();
        }
        return this.taskService.findByName(name);
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable int id) throws NotPersistedException {
        return this.taskService.findById(id);
    }

//    @PostMapping
//    public ResponseEntity<Task> create(@RequestBody Task task) throws URISyntaxException {
//        Task task = new Task(task.getId(), task.getName(), task.getCategory());
//        Task response = this.taskService.createTask(task);
//        return ResponseEntity.created(new URI("localhost:8080/api/tasks/" + response.id())).body(response);
//    }


}
