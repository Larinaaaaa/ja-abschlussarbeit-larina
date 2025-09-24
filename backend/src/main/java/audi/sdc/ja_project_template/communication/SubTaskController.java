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

    @GetMapping("/search")
    public List<SubTask> getSubTasksByName(@RequestParam String name) {
        return subTaskService.findByName(name);
    }

    @GetMapping("/task/{taskId}")
    public List<SubTask> getSubTasksByTaskId(@PathVariable Integer taskId) {
        return subTaskService.findSubTaskById(taskId);
    }

    @GetMapping("/completed")
    public List<SubTask> getSubTasksByCompleted(@RequestParam boolean completed) {
        return subTaskService.findByCompleted(completed);
    }

    @PostMapping
    public ResponseEntity<SubTask> createSubTask(@RequestBody SubTask subTask) {
        SubTask created = subTaskService.createTask(subTask);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubTask> updateSubTask(@PathVariable int id, @RequestBody SubTask updatedSubTask) {
        updatedSubTask.setId(id); // ensure correct ID
        SubTask saved = subTaskService.updateTask(updatedSubTask);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubTask(@PathVariable int id) {
        subTaskService.deleteSubTaskById(id);
        return ResponseEntity.noContent().build();
    }
}
