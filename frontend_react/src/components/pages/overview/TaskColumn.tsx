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

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    subTasksByTask: { [taskId: number]: SubTask[] };
    handleCreateSubtask: (taskId: number, name: string) => void;
    loading?: boolean;
    error?: string | null;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
                                                   title,
                                                   tasks,
                                                   subTasksByTask,
                                                   handleCreateSubtask,
                                                   loading,
                                                   error
                                               }) => {
    const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
    const [inputVisibility, setInputVisibility] = useState<Record<number, boolean>>({});
    const [showTaskInput, setShowTaskInput] = useState(false);
    const { addTask } = useTasks();

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

    return (
        <div className="overview-column">
            <div className="category-header">
                <Text as="h1" weight="bold" variant="order4">{title}</Text>
                <button
                    className="round-plus-button"
                    onClick={() => setShowTaskInput(!showTaskInput)}
                >  +</button>
            </div>

            {showTaskInput && (
                <TaskInput
                    defaultCategory={title as unknown as Category}
                    onCreateTask={handleCreateTask}
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
                                    checked={!!completedTasks[task.id]}
                                    onChange={() => toggleCompleted(task.id)}
                                />
                                <Text variant="order4" weight="bold">{task.name}</Text>
                            </div>
                        }
                        hint={`Fällig am ${new Date(task.dueDate).toLocaleDateString("de-DE")}`}
                        hintSeverity="informative"
                        subline={task.details}
                    >
                        <div className="accordion-content">
                            {/* Subtasks anzeigen */}
                            <SubtaskList subtasks={subTasksByTask[task.id] || []}/>

                            <button
                                className="round-plus-button"
                                onClick={() => toggleInput(task.id)}
                            >+</button>
                            {inputVisibility[task.id] && (
                                <SubtaskInput
                                    taskId={task.id}
                                    onCreateSubtask={handleCreateSubtask}
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
