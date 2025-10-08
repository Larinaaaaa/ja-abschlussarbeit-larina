package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.SubTask;
import audi.sdc.ja_project_template.service.SubTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subtasks")
public class SubTaskController {

    private final SubTaskService subTaskService;

    @Autowired
    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
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
    public ResponseEntity<SubTask> createSubTask(@RequestBody SubTask subTask) {
        SubTask created = subTaskService.createSubTask(subTask);
        return ResponseEntity.ok(created);
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
