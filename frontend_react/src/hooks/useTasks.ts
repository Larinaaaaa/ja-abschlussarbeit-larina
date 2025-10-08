import {useEffect, useState} from "react";
import {Task} from "../model/Task.ts";
import {loadTasks} from "../api/task-api.ts";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                setLoading(true);
                const data = await loadTasks();
                setTasks(data);
            } catch (err) {
                console.error("Fehler beim Laden der Tasks:", err);
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, []);
    return { tasks, loading, error, setTasks };
}

/*async function addTask(task: Omit<Task, "id">) {
    try {
        const newTask = await createTask(task);
        setTasks(prev => [...prev, newTask]);
    } catch (err) {
        console.error("Fehler beim Hinzufügen der Task:", err);
    }
}
*/