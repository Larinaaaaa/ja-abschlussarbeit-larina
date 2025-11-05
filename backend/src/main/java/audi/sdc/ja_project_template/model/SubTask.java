package audi.sdc.ja_project_template.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "subtask")
public class SubTask{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "task_id")
    @JsonBackReference
    private Task task;

    public SubTask(){}

    public SubTask(Long id, String name, boolean completed,  Task task) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.task = task;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    @Transient
    public Long getTaskId() {
        return task != null ? task.getId() : null;
    }

    @Override
    public String toString() {
        return String.format("Subtask #%d: %s, [completed: %s]", id, name, completed);

    }
}
