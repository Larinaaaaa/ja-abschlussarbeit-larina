import React, {useState} from "react";
import {DatePicker, Select, Text, TextField} from "@audi/audi-ui-react";
import {Category} from "../../../model/enums/Category.ts";
import {Status} from "../../../model/enums/Status.ts";
import {Priority} from "../../../model/enums/Priority.ts";
import {Complexity} from "../../../model/enums/Complexity.ts";

interface TaskInputProps {
    defaultCategory: Category;
    defaultStatus: Status;
    defaultPriority: Priority;
    defaultComplexity: Complexity;

    onCreateTask: (task: {
        name: string;
        details: string;
        dueDate: string | undefined;
        category: Category;
        status: Status;
        priority: Priority;
        complexity: Complexity;
    }) => void;
    loading?: boolean;
    error?: string | null;
}

const TaskInput: React.FC<TaskInputProps> = ({
                                                 defaultCategory,
                                                 defaultStatus,
                                                 defaultPriority,
                                                 defaultComplexity,
                                                 onCreateTask,
                                                 loading,
                                                 error,
                                             }) => {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState<string>();
    const [category, setCategory] = useState<Category>(defaultCategory);
    const [status, setStatus] = useState<Status>(defaultStatus);
    const [priority, setPriority] = useState<Priority>(defaultPriority);
    const [complexity, setComplexity] = useState<Complexity>(defaultComplexity);


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
        setCategory(Category.SONSTIGE);
        setStatus(Status.TODO);
        setPriority(Priority.MEDIUM);
        setComplexity(Complexity.MEDIUM);
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

            <button
                className="subtask-add-button"
                onClick={handleSubmit}
                disabled={loading}
            >
                <Text variant="copy2" className="button-text">
                    {loading ? "Speichert..." : "Erstellen"}
                </Text>
            </button>

            {error && <Text variant="copy2">{error}</Text>}
        </div>
    );
};

export default TaskInput;
