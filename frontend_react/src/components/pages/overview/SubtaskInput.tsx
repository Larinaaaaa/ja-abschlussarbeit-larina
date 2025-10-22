import './Overview.css'
import {TextField, Text} from "@audi/audi-ui-react";
import {useState} from "react";

interface SubtaskInputProps {
    taskId: number;
    onCreateSubtask: (taskId: number, name: string) => void;
    onCancel: () => void;
    loading?: boolean;
    error?: string | null;
}

const SubtaskInput: React.FC<SubtaskInputProps> = ({taskId, onCreateSubtask, onCancel, loading, error}) => {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        const name = value.trim();
        if (!name || loading) return;
        onCreateSubtask(taskId, name);
        setValue("");
    };

    return (
        <div className="subtask-input-row">
            <TextField
                hideLabelOptional
                inputId={`subtask-input-${taskId}`}
                label="Aufgabe Hinzufügen"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                disabled={loading}
            />
            <button className="subtask-add-button" onClick={handleSubmit} disabled={loading}>
                <Text variant="copy2" className="button-text">
                    {loading ? "Lädt..." : "Bestätigen"}
                </Text></button>
            <button className="subtask-cancel-button" onClick={onCancel} disabled={loading}>
                <Text variant="copy2" className="subtask-cancel-button-text">
                    Abbrechen
                </Text></button>
            {error && <Text variant="copy2">{error}</Text>}
        </div>
    );
};

export default SubtaskInput;
