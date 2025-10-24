import {SubTask} from "../model/SubTask.ts";

const BASE_URL = "http://localhost:8080/api/subtasks";

export async function loadSubTasks(): Promise<SubTask[]> {
    const subTasks: SubTask[] = [];
    try {
        const response = await fetch(`${BASE_URL}`);
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
        const response = await fetch(`${BASE_URL}`, {
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
        console.error("Fehler beim erstellen der Unteraufgabe: ", e);
        return null;
    }
}

export async function updateSubtask(subtask: {
    subtaskId: number,
    name: string;
    completed: boolean
    taskId: number;
}) {
    try {
        console.log("Aufgabe:", JSON.stringify(subtask, null, 2));
        const response = await fetch(`${BASE_URL}/${subtask.subtaskId}`, {
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
        console.error("Fehler beim aktualisieren der Unteraufgabe: ", e);
        return null;
    }
}

export async function deleteSubtask(subtaskId: number): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}/${subtaskId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return true;

    } catch (e) {
        console.error("Fehler beim löschen der Unteraufgabe: ", e);
        return false;
    }
}