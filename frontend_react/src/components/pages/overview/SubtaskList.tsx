import './Overview.css'
import {Checkbox, Text} from "@audi/audi-ui-react";
import {SubTask} from "../../../model/SubTask";

interface SubtaskListProps {
    subtasks: SubTask[];
    subtaskEditVisibility: boolean;
    onSelectSubtaskToEdit?: (subtaskId: number, currentName: string) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({
                                                     subtasks,
                                                     subtaskEditVisibility,
                                                     onSelectSubtaskToEdit
                                                 }) => {
    if (subtasks.length === 0) return null;

    return (
        <div className="subtasks">
            {subtasks.map((subtask) => (
                <div key={subtask.id} className="subtask-item">
                    <Checkbox inputId={`subtask-${subtask.id}`} checked={subtask.completed}/>
                    <Text variant="copy1">{subtask.name}</Text>
                    {subtaskEditVisibility && (
                        <button id="edit-button"
                                onClick={() => onSelectSubtaskToEdit?.(subtask.id!, subtask.name)}>
                            <Text variant="copy3" weight="bold"
                                  className="button-text">
                                Bearbeiten
                            </Text>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubtaskList;
