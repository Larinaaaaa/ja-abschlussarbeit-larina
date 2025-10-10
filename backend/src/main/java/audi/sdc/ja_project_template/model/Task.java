package audi.sdc.ja_project_template.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate created;

    @Column(name = "due_date")
    @JsonFormat(shape =  JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    private String details;

    @Enumerated(EnumType.STRING)
    private Category category;
    private String priority;
    private String complexity;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SubTask> subtasks = new ArrayList<>();

    public Task() {
    }

    public Task(Long id, String name, String details) {
        this.id = id;
        this.name = name;
        this.created = LocalDate.now();
        this.dueDate = dueDate;
        this.details = details;
        this.category = category;
        this.priority = priority;
        this.complexity = complexity;
        this.status = Status.OPEN;
    }

    public Task(String name, LocalDate dueDate, String details, Category category, String priority, String complexity) {
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

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getComplexity() {
        return complexity;
    }

    public void setComplexity(String complexity) {
        this.complexity = complexity;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<SubTask> getSubtasks() {
        return subtasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return id == task.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Task #").append(id)
                .append(": ").append(name)
                .append(" [").append(status).append("] ")
                .append("due ").append(dueDate)
                .append("\n  Details: ").append(details)
                .append("\n  Category: ").append(category)
                .append(", Priority: ").append(priority)
                .append(", Complexity: ").append(complexity)
                .append("\n  SubTasks:\n");

        if (subtasks.isEmpty()) {
            sb.append("    (no subtasks)");
        } else {
            for (SubTask st : subtasks) {
                sb.append("    - ").append(st).append("\n");
            }
        }
        return sb.toString();
    }
}
