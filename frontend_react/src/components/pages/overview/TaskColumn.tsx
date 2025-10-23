import './Overview.css'
import {Accordion, AccordionSection, Checkbox, Text} from "@audi/audi-ui-react";
import {useState} from "react";
import {Task} from "../../../model/Task";
import {SubTask} from "../../../model/SubTask";
import SubtaskList from "./SubtaskList";
import SubtaskInput from "./SubtaskInput";
import TaskInput from "./TaskInput.tsx";
import {Category} from "../../../model/enums/Category.ts";
import {Status} from "../../../model/enums/Status.ts";
import {Complexity} from "../../../model/enums/Complexity.ts";
import {Priority} from "../../../model/enums/Priority.ts";
import SubtaskEdit from "./SubtaskEdit.tsx";

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    subTasksByTask: { [taskId: number]: SubTask[] };
    handleCreateTask: (taskData: {
        name: string;
        details: string;
        dueDate: string | undefined;
        category: Category;
        status: Status;
        priority: Priority;
        complexity: Complexity;
    }) => void;
    handleCreateSubtask: (taskId: number, name: string) => void;
    handleUpdateSubtask: (subtaskId: number, taskId: number, updatedData: { name: string; completed: boolean }) => void;
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
                                                    handleCreateTask,
                                                   handleCreateSubtask,
                                                   handleUpdateSubtask,
                                                   loading,
                                                   error
                                               }) => {
    const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
    const [inputVisibility, setInputVisibility] = useState<Record<number, boolean>>({});
    const [showTaskInput, setShowTaskInput] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState<Record<number, boolean>>({});

    const [editingSubtask, setEditingSubtask] = useState<{
        taskId: number;
        subtaskId: number;
        name: string;
    } | null>(null);

    const toggleEditingMode = (taskId: number) => {
        setIsEditingMode(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    };

    const toggleCompleted = (id: number) => {
        setCompletedTasks(prev => ({...prev, [id]: !prev[id]}));
    };

    const toggleInput = (taskId: number) => {
        setInputVisibility(prev => ({...prev, [taskId]: !prev[taskId]}));
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
                    defaultStatus={Status.TODO} // Default Status
                    defaultComplexity={Complexity.MEDIUM}
                    defaultPriority={Priority.MEDIUM}
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

                            {editingSubtask && editingSubtask.taskId === task.id && (
                                <SubtaskEdit
                                    subtaskId={editingSubtask.subtaskId}
                                    initialName={editingSubtask.name}
                                    onSave={(newName) => {
                                        handleUpdateSubtask(
                                            editingSubtask.subtaskId,
                                            editingSubtask.taskId,
                                            { name: newName, completed: false }
                                        );
                                        setEditingSubtask(null);
                                    }}
                                    onCancel={() => setEditingSubtask(null)}
                                />
                            )}

                            {subTasksByTask[task.id] && subTasksByTask[task.id].length > 0 && (
                                <button
                                    id="edit-button"
                                    onClick={() => toggleEditingMode(task.id)}
                                >
                                    <Text variant="copy3" weight="bold" className="button-text">
                                        {isEditingMode[task.id] ? "Fertig" : "Bearbeiten"}
                                    </Text>
                                </button>
                            )}

                            <SubtaskList
                                subtasks={subTasksByTask[task.id] || []}
                                isEditingMode={isEditingMode[task.id] || false}
                                onSelectSubtaskToEdit={(subtaskId) => {
                                    const subtask = subTasksByTask[task.id].find(s => s.id === subtaskId);
                                    if (subtask) {
                                        setEditingSubtask({
                                            taskId: subtask.taskId,
                                            subtaskId: subtask.id!,
                                            name: subtask.name,
                                        });
                                    }
                                }}
                            />
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