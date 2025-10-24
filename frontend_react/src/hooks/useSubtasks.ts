import {useState, useEffect} from "react";
import {SubTask} from "../model/SubTask";
import {createSubTask, loadSubTasks, updateSubtask, deleteSubtask} from "../api/subtask-api";

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
                setError(null);

                const allSubTasks = await loadSubTasks();
                const grouped = allSubTasks.reduce<SubTasksByTask>((subTasksByTask, subTask) => {
                    const { taskId } = subTask;
                    if (!taskId) return subTasksByTask;
                    if (!subTasksByTask[taskId]) subTasksByTask[taskId] = [];
                    subTasksByTask[taskId].push(subTask);
                    return subTasksByTask;
                }, {});

                setSubTasksByTask(grouped);

                console.log("Fetched Subtasks:", allSubTasks);
            } catch (e) {
                console.error(e);
                setError((e as Error).message);
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
            const newSubTask = { taskId, name, completed: false };
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

    const updateSubTask = async (
        subtaskId: number,
        taskId: number,
        updatedData: { name: string; completed: boolean }) => {
        setLoading(true);
        setError(null);

        try {
            const result = await updateSubtask({
                subtaskId,
                name: updatedData.name,
                completed: updatedData.completed,
                taskId
            });

            if (result) {
                setSubTasksByTask(prev => ({
                    ...prev,
                    [taskId]: (prev[taskId] ?? []).map(subtask =>
                        subtask.id === subtaskId ? result : subtask
                    ),
                }));
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const deleteSubTask = async (taskId: number, subtaskId: number) => {
        setLoading(true);
        setError(null);

        try {
            const success = await deleteSubtask(subtaskId);
            if (success) {
                setSubTasksByTask(prev => ({
                    ...prev,
                    [taskId]: (prev[taskId] ?? []).filter(subtask => subtask.id !== subtaskId),
                }));
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {subTasksByTask, addSubTask, updateSubTask, deleteSubTask, loading, error};
}
