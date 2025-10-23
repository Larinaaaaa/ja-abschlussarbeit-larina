import React, {useState} from "react";
import {DatePicker, Select, Text, TextField, Button} from "@audi/audi-ui-react";
import {Category} from "../../../model/enums/Category.ts";
import {Status} from "../../../model/enums/Status.ts";
import {Priority} from "../../../model/enums/Priority.ts";
import {Complexity} from "../../../model/enums/Complexity.ts";

interface TaskInputProps {

    onCreateTask: (task: {
        name: string;
        details: string;
        dueDate: string | undefined;
        category: Category | undefined;
        status: Status | undefined;
        priority: Priority | undefined;
        complexity: Complexity | undefined;
    }) => void;
    onCancel: () => void;
    loading?: boolean;
    error?: string | null;
}

const TaskInput: React.FC<TaskInputProps> = ({
                                                 onCreateTask,
                                                 onCancel,
                                                 loading,
                                                 error,
                                             }) => {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState<string>();
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const [status, setStatus] = useState<Status | undefined>(undefined);
    const [priority, setPriority] = useState<Priority | undefined>(undefined);
    const [complexity, setComplexity] = useState<Complexity | undefined>(undefined);

    const handleSubmit = () => {
        if (!name.trim() || loading) return;
        onCreateTask({
            name,
            details,
            dueDate,
            category,
            status,
            priority,
            complexity,
        });

        setName("");
        setDetails("");
        setDueDate(undefined);
        setCategory(undefined as unknown as Category);
        setStatus(undefined as unknown as Status);
        setPriority(undefined as unknown as Priority);
        setComplexity(undefined as unknown as Complexity);
    };

    return (
        <div className="task-input-row">
            <TextField
                inputId={`task-name-${category}`}
                hideLabelOptional
                label="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                disabled={loading}
            />

            <TextField
                inputId={`task-details-${category}`}
                label="Details"
                value={details}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails(e.target.value)}
                disabled={loading}
            />

            <DatePicker
                inputId={`task-due-${category}`}
                hideLabelOptional
                label="Fälligkeitsdatum"
                minDate={new Date()}
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(nextValue: Date) =>
                    setDueDate(nextValue.toISOString().split("T")[0])
                }
                disabled={loading}
            />

            <Select
                inputId={`task-category-${category}`}
                required
                label="Kategorie"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCategory(e.target.value as Category)
                }
            >
                <React.Fragment key=".0">
                    <optgroup label="Optionen:">
                        {Object.values(Category).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </optgroup>
                </React.Fragment>
            </Select>

            <Select
                inputId={`task-status-${category}`}
                required
                label="Status"
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(e.target.value as Status)
                }
            >
                <React.Fragment key=".0">
                    <optgroup label="Optionen:">
                        {Object.values(Status).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </optgroup>
                </React.Fragment>
            </Select>

            <Select
                inputId={`task-priority-${category}`}
                required
                label="Priorität"
                value={priority}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setPriority(e.target.value as Priority)}
            >
                <React.Fragment key=".0">
                    <optgroup label="Optionen:">
                        {Object.values(Priority).map((priority) => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </optgroup>
                </React.Fragment>
            </Select>

            <Select
                inputId={`task-complexity-${category}`}
                required
                label="Komplexität"
                value={complexity}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setComplexity(e.target.value as Complexity)}
            >
                <React.Fragment key=".0">
                    <optgroup label="Optionen:">
                        {Object.values(Complexity).map((complexity) => (
                            <option key={complexity} value={complexity}>
                                {complexity}
                            </option>
                        ))}
                    </optgroup>
                </React.Fragment>
            </Select>

            <Button
                variant="primary"
                size="small"
                className="task-add-button"
                onClick={handleSubmit}
                disabled={loading}
            >
                <Text variant="copy1" className="button-text">
                    {loading ? "Speichert..." : "Erstellen"}
                </Text>
            </Button>

            <Button
                variant="secondary"
                size="small"
                className="task-cancel-button"
                onClick={onCancel}
                disabled={loading}
            >
                <Text variant="copy1" className="button-text">
                    Abbrechen
                </Text>
            </Button>

            {error && <Text variant="copy2">{error}</Text>}
        </div>
    );
};

export default TaskInput;
