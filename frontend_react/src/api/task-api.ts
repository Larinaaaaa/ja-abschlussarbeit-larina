import {Task} from "../model/Task.ts";
import {Category} from "../model/enums/Category.ts";
import {Status} from "../model/enums/Status.ts";
import {Priority} from "../model/enums/Priority.ts";
import {Complexity} from "../model/enums/Complexity.ts";

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

export async function createTask(task: Task): Promise<Task | null> {
    try {
        console.log("Aufgabe:", JSON.stringify(task, null, 2));
        const response = await fetch('http://localhost:8080/api/tasks', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Server error ${response.status}:`, errorText);
            return null;
        }

        return await response.json();
    } catch (e) {
        console.error("Fehler beim erstellen der Aufgabe: ", e);
        return null;
    }
}

export async function updateTask(task: {
    taskId: number;
    name?: string;
    details?: string;
    dueDate?: string;
    category?: Category;
    status?: Status;
    priority?: Priority;
    complexity?: Complexity;
}): Promise<Task | null> {
    try {
        console.log("Aufgabe:", JSON.stringify(task, null, 2));

        const { taskId, ...rest } = task; // taskId rausnehmen, Rest bleibt

        const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rest),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Server error ${response.status}:`, errorText);
            return null;
        }

        const updatedTask: Task = await response.json();
        return updatedTask;
    } catch (e) {
        console.error("Fehler beim Update der Aufgabe:", e);
        return null;
    }
}