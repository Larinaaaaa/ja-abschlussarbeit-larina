import { useState, useEffect } from "react";
import { SubTask } from "../model/SubTask";
import { createSubTask, loadSubTasks } from "../api/subtask-api";

export interface SubTasksByTask {
    [taskId: number]: SubTask[];
}

export function useSubTasks() {
    const [subTasksByTask, setSubTasksByTask] = useState<SubTasksByTask>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSubTasks() {
            try {
                setLoading(true);
                const allSubTasks = await loadSubTasks();
                const grouped: SubTasksByTask = {};
                allSubTasks.forEach(sub => {
                    if (!grouped[sub.taskId]) grouped[sub.taskId] = [];
                    grouped[sub.taskId].push(sub);
                });
                setSubTasksByTask(grouped);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchSubTasks();
    }, []);

    const addSubTask = async (taskId: number, name: string) => {
        setLoading(true);
        setError(null);
        try {
            const newSubTask: Omit<SubTask, "id"> = { taskId, name, completed: false };
            const result = await createSubTask(newSubTask);
            if (result) {
                setSubTasksByTask(prev => ({
                    ...prev,
                    [taskId]: [...(prev[taskId] || []), result]
                }));
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { subTasksByTask, addSubTask, loading, error };
}
