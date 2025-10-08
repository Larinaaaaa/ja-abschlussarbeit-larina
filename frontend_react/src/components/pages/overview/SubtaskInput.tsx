import { TextField, Text } from "@audi/audi-ui-react";
import { useState } from "react";

interface SubtaskInputProps {
    onAdd: (name: string) => void;
}

const SubtaskInput: React.FC<SubtaskInputProps> = ({ onAdd }) => {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        const name = value.trim();
        if (!name) return;
        onAdd(name);
        setValue("");
    };

    return (
        <div className="subtask-input-row">
            <TextField
                hideLabelOptional
                inputId="subtask-input"
                label="Unteraufgabe hinzufügen"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            <button className="subtask-add-button" onClick={handleSubmit}>
                <Text id="button-text" variant="copy2">Bestätigen</Text>
            </button>
        </div>
    );
};

export default SubtaskInput;
