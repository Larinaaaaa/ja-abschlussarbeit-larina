import {SubTask} from "../model/SubTask.ts";

export async function loadSubTasks(): Promise<SubTask[]>{
    const subTasks: SubTask[] = ([]) as SubTask[];
    try {
        const response = await fetch('http://localhost:8080/api/subtasks');
        return await response.json();

    } catch (e) {
        console.error(e);
        return Promise.resolve(subTasks);
    }
}