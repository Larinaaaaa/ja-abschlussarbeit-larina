import './Overview.css'
import React, { useState, useEffect } from "react";
import { TextField } from "@audi/audi-ui-react";

interface SubtaskEditProps {
    subtaskId: number;
    initialName: string;
    onSave: (newName: string) => void;
    onCancel: () => void;
}

const SubtaskEdit: React.FC<SubtaskEditProps> = ({ subtaskId, initialName, onSave, onCancel }) => {
    const [editValue, setEditValue] = useState(initialName);


    useEffect(() => {
        setEditValue(initialName);
    }, [initialName, subtaskId]);

    const handleSave = () => {
        if (!editValue.trim()) return;
        onSave(editValue);
    };

    return (
        <div className="edit-controls">
            <TextField
                inputId={`subtask-edit-input-${subtaskId}`} // eindeutige ID
                hideLabelOptional
                label="Name"
                value={editValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            />
            <button onClick={handleSave}>Speichern</button>
            <button onClick={onCancel}>Abbrechen</button>
        </div>
    );
};

export default SubtaskEdit;
