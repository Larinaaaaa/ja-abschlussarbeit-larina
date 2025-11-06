import React from "react";
import {Button, DatePicker, Select, Text, TextField} from "@audi/audi-ui-react";
import {Category} from "../../../model/enums/Category.ts";
import {Status} from "../../../model/enums/Status.ts";
import {Priority} from "../../../model/enums/Priority.ts";
import {Complexity} from "../../../model/enums/Complexity.ts";

interface TaskEditProps {
    task: {
        id: number;
        name: string;
        details: string;
        dueDate?: string;
        category: Category;
        status: Status;
        priority: Priority;
        complexity: Complexity;
    };
    onCancel: () => void;
    onUpdate: (taskId: number, updatedData: Partial<TaskEditProps["task"]>) => void;
    loading?: boolean;
    error?: string | null;
}

const TaskEdit: React.FC<TaskEditProps> = ({task, onCancel, onUpdate, loading, error}) => {
    const [name, setName] = React.useState(task.name);
    const [details, setDetails] = React.useState(task.details);
    const [dueDate, setDueDate] = React.useState(task.dueDate);
    const [category, setCategory] = React.useState<Category>(task.category);
    const [status, setStatus] = React.useState<Status>(task.status);
    const [priority, setPriority] = React.useState<Priority>(task.priority);
    const [complexity, setComplexity] = React.useState<Complexity>(task.complexity);

    const handleSubmit = () => {
        if (loading) return;

        onUpdate(task.id, {
            name,
            details,
            dueDate,
            category,
            status,
            priority,
            complexity,
        });
    };

    return (
        <div className="task-edit-row">
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

export default TaskEdit;