import './Overview.css'
import React, { useState, useEffect } from "react";
import { TextField, Text } from "@audi/audi-ui-react";

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
                inputId={`subtask-edit-input-${subtaskId}`}
                hideLabelOptional
                label="Name"
                value={editValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            />

            <div className="edit-buttons">
                <button id="edit-button" onClick={handleSave}>
                    <Text variant="copy3" weight="bold" className="button-text">
                        Speichern
                    </Text>
                </button>

                <button id="edit-button" onClick={onCancel}>
                    <Text variant="copy3" weight="bold" className="button-text">
                        Abbrechen
                    </Text>
                </button>
            </div>
        </div>
    );
};

export default SubtaskEdit;
