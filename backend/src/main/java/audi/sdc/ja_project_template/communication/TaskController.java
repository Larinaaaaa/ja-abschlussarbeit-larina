package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.Animal;
import audi.sdc.ja_project_template.model.Task;
import audi.sdc.ja_project_template.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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


}
