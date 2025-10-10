import {Task, CreateTaskRequest} from "../model/Task.ts";

export async function loadTasks(): Promise<Task[]> {
    try {
        const response = await fetch('http://localhost:8080/api/tasks');

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const tasks = await response.json();
        return tasks as Task[];
    } catch (e) {
        console.error("Fehler beim laden der Aufgaben: ", e);
        return [];
    }
}

export async function createTask(task: CreateTaskRequest): Promise<Task> {
    try {
        const response = await fetch('http://localhost:8080/api/tasks', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const createdTask: Task = await response.json();
        return createdTask;
    } catch (e) {
        console.error("Fehler beim erstellen der Aufgabe: ", e);
        throw e
    }
}
