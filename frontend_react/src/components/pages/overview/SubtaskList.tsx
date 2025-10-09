import './Overview.css'
import { Checkbox, Text } from "@audi/audi-ui-react";
import { SubTask } from "../../../model/SubTask";

interface SubtaskListProps {
    subtasks: SubTask[];
}

const SubtaskList: React.FC<SubtaskListProps> = ({ subtasks }) => {
    if (subtasks.length === 0) return null;

    return (
        <div className="subtasks">
            {subtasks.map((subtask) => (
                <div key={subtask.id} className="subtask-item">
                    <Checkbox inputId={`subtask-${subtask.id}`} checked={subtask.completed} />
                    <Text variant="copy1">{subtask.name}</Text>
                </div>
            ))}
        </div>
    );
};

export default SubtaskList;
