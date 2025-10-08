import {useEffect, useState} from "react";
import {Task} from "../model/Task.ts";
import {loadTasks} from "../api/task-api.ts";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await loadTasks();
                setTasks(data);
            } catch (err) {
                console.error("Fehler beim Laden der Tasks:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    return { tasks, loading, setTasks };
}