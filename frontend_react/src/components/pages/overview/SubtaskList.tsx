import './Overview.css'
import {Checkbox, Text} from "@audi/audi-ui-react";
import {SubTask} from "../../../model/SubTask";

interface SubtaskListProps {
    subtasks: SubTask[];
    isEditingMode: boolean;
    onSelectSubtaskToEdit: (subtaskId: number) => void;
    onDeleteSubtask: (subtaskId: number) => void;
    onToggleSubtaskCompleted: (subtaskId: number, completed: boolean) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({
                                                     subtasks,
                                                     isEditingMode,
                                                     onSelectSubtaskToEdit,
                                                     onDeleteSubtask,
                                                     onToggleSubtaskCompleted
                                                 }) => {
    if (subtasks.length === 0) return null;

    return (
        <div className="subtasks">
            {subtasks.map(subtask => (
                <div key={subtask.id} className="subtask-item">
                    <Checkbox
                        inputId={`subtask-${subtask.id}`}
                        checked={subtask.completed}
                        onChange={(e: any) => {
                            e.stopPropagation();
                            const newCompleted = !subtask.completed;
                            onToggleSubtaskCompleted(subtask.id!, newCompleted);
                        }}
                    />
                    <Text
                        variant="copy1"
                        tint={subtask.completed ? "secondary" : "primary"}
                    >{subtask.name}</Text>

                    {isEditingMode && (
                        <div className="subtask-buttons">
                            <button
                                id="edit-button"
                                onClick={() => onSelectSubtaskToEdit(subtask.id!)}>
                                <Text
                                    variant="copy3"
                                    weight="bold"
                                    className="button-text">
                                    Bearbeiten
                                </Text>
                            </button>
                            <button
                                id="edit-button"
                                onClick={() => onDeleteSubtask(subtask.id!)}
                            >
                                <Text
                                    variant="copy3"
                                    weight="bold"
                                    className="button-text"
                                >
                                    Löschen
                                </Text>
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubtaskList;
