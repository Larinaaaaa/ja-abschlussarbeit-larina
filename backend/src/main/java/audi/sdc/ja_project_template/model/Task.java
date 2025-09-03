package audi.sdc.ja_project_template.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Task {
    private int id;
    private String name;
    private LocalDate created;
    private LocalDate dueDate;
    private String details;
    private String category;
    private String priority;
    private String complexity;
    private Status status;

    private List<SubTask> subtasks = new ArrayList<>();

    public Task(int id, String name, LocalDate dueDate, String details, String category,
                String priority, String complexity) {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
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

    public void addSubtask(SubTask subTask) {
        subTask.setTask(this);
        subtasks.add(subTask);
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
