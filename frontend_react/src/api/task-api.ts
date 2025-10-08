import {Task} from "../model/Task.ts";
import {loadSubTasks} from "./subtask-api.ts";

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

export async function loadTasksWithSubtasks(): Promise<Task[]> {
    try {
        const [tasks, subtasks] = await Promise.all([loadTasks(), loadSubTasks()]);

        const tasksWithSubtasks = tasks.map(task => ({
            ...task,
            subtasks: subtasks.filter(st => st.taskId === task.id)
        }));

        return tasksWithSubtasks;
    } catch (e) {
        console.error(e);
        return [];
    }
}
