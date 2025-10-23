import {useEffect, useState} from "react";
import {Task} from "../model/Task.ts";
import {createTask, loadTasks} from "../api/task-api.ts";
import {Category} from "../model/enums/Category.ts";
import {Status} from "../model/enums/Status.ts";
import {Priority} from "../model/enums/Priority.ts";
import {Complexity} from "../model/enums/Complexity.ts";

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
        dueDate?: string;
        category: Category;
        status: Status;
        priority: Priority;
        complexity: Complexity;
    }) => {
        setLoading(true);
        setError(null);

        try {
            const created = await createTask({
                ...task,
                dueDate: task.dueDate ?? new Date().toISOString().split("T")[0],
                created: new Date().toISOString().split("T")[0],
                subtasks: [],
            });

            if (created) {
                setTasks(prev => [...prev, created]);
            } else {
                setError("Fehler beim Erstellen der Aufgabe");
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { tasks, addTask, loading, error };
}