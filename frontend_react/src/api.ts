import {Task} from "./model/Task.ts";
import {SubTask} from "./model/SubTask.ts";

export async function loadTasks(): Promise<Task[]>{
    const tasks: Task[] = ([]) as Task[];
    try {
        const response = await fetch('http://localhost:8080/api/tasks');
        return await response.json();

    } catch (e) {
        console.error(e);
        return Promise.resolve(tasks);
    }
}

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