import { Accordion, AccordionSection, Checkbox, Text } from "@audi/audi-ui-react";
import { useState } from "react";
import { Task } from "../../../model/Task";
import { SubTask } from "../../../model/SubTask";
import { createSubTask } from "../../../api/subtask-api";
import SubtaskList from "./SubtaskList";
import SubtaskInput from "./SubtaskInput";

interface TaskColumnProps {
    title: string;
    tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
    const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
    const [inputVisibility, setInputVisibility] = useState<Record<number, boolean>>({});

    const toggleCompleted = (id: number) => {
        setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleInput = (taskId: number) => {
        setInputVisibility((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
    };

    const handleAddSubtask = async (taskId: number, name: string) => {
        const newSubtask: SubTask = { name, completed: false, taskId, details: "" };
        const result = await createSubTask(newSubtask);
        if (result) console.log("Subtask erstellt:", result);
    };

    return (
        <div className="overview-column">
            <div className="category-header">
                <Text as="h1" weight="bold" variant="order4">
                    {title}
                </Text>
            </div>

            <Accordion>
                {tasks.map((task) => (
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
                            {/* Subtasks separat */}
                            <SubtaskList subtasks={task.subtasks || []} />

                            <button
                                className="round-plus-button"
                                onClick={() => toggleInput(task.id)}
                            >
                                +
                            </button>

                            {inputVisibility[task.id] && (
                                <SubtaskInput
                                    onAdd={(name) => handleAddSubtask(task.id, name)}
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
