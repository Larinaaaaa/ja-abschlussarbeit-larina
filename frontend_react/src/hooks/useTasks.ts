import {useEffect, useState} from "react";
import {Task} from "../model/Task.ts";
import {createTask, loadTasks} from "../api/task-api.ts";
import {Category} from "../model/enums/Category.ts";
import {Status} from "../model/enums/Status.ts";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await loadTasks();
                setTasks(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, []);

    const addTask = async (task: {
        name: string;
        details: string;
        dueDate: Date | null;
        category: Category;
        status: Status;
        priority: string;
        complexity: string;
    }) => {
        setLoading(true);
        try {
            const created = await createTask({
                ...task,
                created: new Date().toISOString().split("T")[0],
                dueDate: task.dueDate ? task.dueDate.toISOString().split("T")[0] : null,
                subtasks: [],
            });
            setTasks(prev => [...prev, created]);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { tasks, addTask, loading, error };
}