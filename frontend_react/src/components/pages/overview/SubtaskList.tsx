import { Checkbox, Text } from "@audi/audi-ui-react";
import { SubTask } from "../../../model/SubTask";

interface SubtaskListProps {
    subtasks: SubTask[];
}

const SubtaskList: React.FC<SubtaskListProps> = ({ subtasks }) => {
    if (subtasks.length === 0) return null;

    return (
        <div className="subtasks">
            {subtasks.map((sub) => (
                <div key={sub.id} className="subtask-item">
                    <Checkbox inputId={`subtask-${sub.id}`} checked={sub.completed} />
                    <Text variant="copy1">{sub.name}</Text>
                </div>
            ))}
        </div>
    );
};

export default SubtaskList;
