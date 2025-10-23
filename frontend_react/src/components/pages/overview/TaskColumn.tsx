import './Overview.css'
import {Accordion, AccordionSection, Checkbox, Text} from "@audi/audi-ui-react";
import {useState} from "react";
import {Task} from "../../../model/Task";
import {SubTask} from "../../../model/SubTask";
import SubtaskList from "./SubtaskList";
import SubtaskInput from "./SubtaskInput";
import {useTasks} from "../../../hooks/useTasks.ts";
import TaskInput from "./TaskInput.tsx";
import {Category} from "../../../model/enums/Category.ts";
import {Status} from "../../../model/enums/Status.ts";
import {Complexity} from "../../../model/enums/Complexity.ts";
import {Priority} from "../../../model/enums/Priority.ts";

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    subTasksByTask: { [taskId: number]: SubTask[] };
    handleCreateSubtask: (taskId: number, name: string) => void;
    handleUpdateSubtask: (taskId: number, subtaskId: number, updatedData: { name: string; completed: boolean }) => void;
    loading?: boolean;
    error?: string | null;
}

const complexityLabels: Record<Complexity, string> = {
    [Complexity.LOW]: "Niedrig",
    [Complexity.MEDIUM]: "Mittel",
    [Complexity.HIGH]: "Hoch",
}

const priorityLabels: Record<Priority, string> = {
    [Priority.LOW]: "Niedrig",
    [Priority.MEDIUM]: "Mittel",
    [Priority.HIGH]: "Hoch",
}

const TaskColumn: React.FC<TaskColumnProps> = ({
                                                   title,
                                                   tasks,
                                                   subTasksByTask,
                                                   handleCreateSubtask,
                                                   handleUpdateSubtask,
                                                   loading,
                                                   error
                                               }) => {
    const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
    const [inputVisibility, setInputVisibility] = useState<Record<number, boolean>>({});
    const [showTaskInput, setShowTaskInput] = useState(false);

    const [editModeTaskId, setEditModeTaskId] = useState<number | null>(null);
    const [selectedSubtaskId, setSelectedSubtaskId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const {addTask} = useTasks();

    const handleCreateTask = async (taskData: any) => {
        await addTask(taskData);
        setShowTaskInput(false);
    };

    const toggleCompleted = (id: number) => {
        setCompletedTasks(prev => ({...prev, [id]: !prev[id]}));
    };

    const toggleInput = (taskId: number) => {
        setInputVisibility(prev => ({...prev, [taskId]: !prev[taskId]}));
    };

    const handleEditSubtask = (taskId: number) => {
        setEditModeTaskId(taskId);
        setSelectedSubtaskId(null);
        setEditValue("");
    };

    const handleSelectSubtaskToEdit = (subtaskId: number, currentName: string) => {
        setSelectedSubtaskId(subtaskId);
        setEditValue(currentName);
    };

    const handleConfirmEdit = async () => {
        if (!editModeTaskId || !selectedSubtaskId || !editValue.trim()) return;

        try {
            await handleUpdateSubtask(editModeTaskId, selectedSubtaskId, {
                name: editValue,
                completed: false,
            });
        } catch (err) {
            console.error("Fehler beim Aktualisieren der Unteraufgabe:", err);
        } finally {
            setEditModeTaskId(null);
            setSelectedSubtaskId(null);
            setEditValue("");
        }
    };


    return (
        <div className="overview-column">
            <div className="category-header">
                <Text as="h1" weight="bold" variant="order4">{title}</Text>
                <button
                    className="round-plus-button-black"
                    onClick={() => setShowTaskInput(!showTaskInput)}
                >+
                </button>
            </div>

            {showTaskInput && (
                <TaskInput
                    defaultCategory={title as unknown as Category}
                    defaultStatus={title as unknown as Status}
                    defaultComplexity={title as unknown as Complexity}
                    defaultPriority={title as unknown as Priority}
                    onCreateTask={handleCreateTask}
                    onCancel={() => setShowTaskInput(false)}
                    loading={loading}
                    error={error}
                />
            )}

            <Accordion>
                {tasks.map(task => (
                    <AccordionSection
                        key={task.id}
                        headingLevel="h2"
                        id={`task-${task.id}`}
                        label={
                            <div className="task-label">
                                <Checkbox
                                    inputId={`checkbox-${task.id}`}
                                    checked={completedTasks[task.id]}
                                    onChange={() => toggleCompleted(task.id)}
                                />
                                <div className="task-subline">
                                    <Text variant="order4" weight="bold">{task.name}
                                        <button id="edit-button">
                                            <Text variant="copy3" weight="bold"
                                                  className="button-text">Bearbeiten</Text>
                                        </button>
                                        <button id="edit-button">
                                            <Text variant="copy3" weight="bold" className="button-text">Löschen</Text>
                                        </button>

                                    </Text>
                                    <Text variant="copy1" weight="normal">{task.details}</Text>
                                    <Text variant="copy3"
                                          weight="normal">Komplexität: {complexityLabels[task.complexity]} &
                                        Priorität: {priorityLabels[task.priority]}</Text>
                                    <Text variant="copy2"
                                          weight="bold">{`Vom: ${task.created ? new Date(task.created).toLocaleDateString("de-DE") : "-"}`}</Text>
                                </div>
                            </div>
                        }
                        hint={`Fällig am ${task.dueDate ? new Date(task.dueDate).toLocaleDateString("de-DE") : "-"}`}
                        hintSeverity="informative"
                    >
                        <div className="accordion-content">

                            {subTasksByTask[task.id] && subTasksByTask[task.id].length > 0 && (
                                <button id="edit-button" onClick={() => handleEditSubtask(task.id)}>
                                    <Text variant="copy3" weight="bold"
                                          className="button-text">
                                        Bearbeiten
                                    </Text>
                                </button>
                            )}

                            <SubtaskList
                                subtasks={subTasksByTask[task.id] || []}
                                subtaskEditVisibility={editModeTaskId === task.id}
                                onSelectSubtaskToEdit={handleSelectSubtaskToEdit}/>

                            {editModeTaskId === task.id && selectedSubtaskId && (
                                <div className="edit-controls">
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <button onClick={handleConfirmEdit}>Speichern</button>
                                    <button onClick={() => setEditModeTaskId(null)}>Abbrechen</button>
                                </div>
                            )}

                            <div>
                                <button
                                    className="round-plus-button"
                                    onClick={() => toggleInput(task.id)}
                                >+
                                </button>
                            </div>
                            {inputVisibility[task.id] && (
                                <SubtaskInput
                                    taskId={task.id}
                                    onCreateSubtask={handleCreateSubtask}
                                    onCancel={() => toggleInput(task.id)}
                                    loading={loading}
                                    error={error}
                                />
                            )}
                        </div>
                    </AccordionSection>
                ))}
            </Accordion>
        </div>
    );
};

export default TaskColumn;