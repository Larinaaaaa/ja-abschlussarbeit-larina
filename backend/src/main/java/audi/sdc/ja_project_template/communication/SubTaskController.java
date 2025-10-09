package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.SubTask;
import audi.sdc.ja_project_template.model.Task;
import audi.sdc.ja_project_template.service.SubTaskService;
import audi.sdc.ja_project_template.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/subtasks")
public class SubTaskController {

    private final SubTaskService subTaskService;
    private final TaskService taskService;

    @Autowired
    public SubTaskController(SubTaskService subTaskService, TaskService taskService) {
        this.subTaskService = subTaskService;
        this.taskService = taskService;
    }

    @GetMapping
    public List<SubTask> getAllSubTasks() {
        return subTaskService.findAllSubTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubTask> getSubTaskById(@PathVariable Long id) {
        return subTaskService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name")
    public List<SubTask> getSubTasksByName(@RequestParam String name) {
        return subTaskService.findByName(name);
    }

    @GetMapping("/task/{taskId}")
    public List<SubTask> getSubTasksByTaskId(@PathVariable Long taskId) {
        return subTaskService.findSubTasksByTaskId(taskId);
    }

    @GetMapping("/completed")
    public List<SubTask> getSubTasksByCompleted(@RequestParam boolean completed) {
        return subTaskService.findByCompleted(completed);
    }

    @PostMapping
    public SubTask createSubTask(@RequestBody Map<String, Object> payload) {
        Long taskId = Long.valueOf(payload.get("taskId").toString());
        String name = payload.get("name").toString();

        Task task = taskService.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task nicht gefunden"));

        SubTask subTask = new SubTask();
        subTask.setName(name);
        subTask.setCompleted(false);
        subTask.setTask(task);

        return subTaskService.createSubTask(subTask);
    }


    @PutMapping("/{id}")
    public ResponseEntity<SubTask> updateSubTask(@PathVariable Long id, @RequestBody SubTask updatedSubTask) {
        updatedSubTask.setId(id);
        SubTask saved = subTaskService.updateSubTask(updatedSubTask);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubTask(@PathVariable Long id) {
        subTaskService.deleteSubTaskById(id);
        return ResponseEntity.noContent().build();
    }
}
