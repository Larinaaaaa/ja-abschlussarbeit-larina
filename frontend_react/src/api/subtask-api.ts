import {SubTask} from "../model/SubTask.ts";

export async function loadSubTasks(): Promise<SubTask[]> {
    const subTasks: SubTask[] = ([]) as SubTask[];
    try {
        const response = await fetch('http://localhost:8080/api/subtasks');
        return await response.json();

    } catch (e) {
        console.error(e);
        return Promise.resolve(subTasks);
    }
}

export async function createSubTask(subtask: SubTask): Promise<SubTask | null> {
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