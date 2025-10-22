import {SubTask} from "../model/SubTask.ts";

export async function loadSubTasks(): Promise<SubTask[]> {
    const subTasks: SubTask[] = [];
    try {
        const response = await fetch('http://localhost:8080/api/subtasks');
        console.log(response)
        return await response.json();

    } catch (e) {
        console.error(e);
        return Promise.resolve(subTasks);
    }
}

export async function createSubTask(subtask: {
    taskId: number;
    name: string;
    completed: boolean
}): Promise<SubTask | null> {
    try {
        const response = await fetch('http://localhost:8080/api/subtasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subtask),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (e) {
        console.error("Fehler beim erstellen der Aufgabe: ", e);
        return null;
    }
}

export async function updateSubtask(subtask: {
    taskId: number;
    name: string;
    completed: boolean
}) {
    try {
        const response = await fetch(`http://localhost:8080/api/subtasks/${subtask.taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: subtask.name,
                completed: subtask.completed,
                taskId: subtask.taskId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error("Fehler beim aktualisieren der Aufgabe: ", e);
        return null;
    }
}