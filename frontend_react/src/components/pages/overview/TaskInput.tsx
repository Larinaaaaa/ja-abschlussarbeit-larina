import { useState } from "react";
import {TextField, Select, Text, DatePicker} from "@audi/audi-ui-react";
import { Category } from "../../../model/Category";
import { Status } from "../../../model/Status";

interface TaskInputProps {
    defaultCategory: Category;
    onCreateTask: (task: {
        name: string;
        details: string;
        dueDate: string;
        category: Category;
        status: Status;
        priority: string;
        complexity: string;
    }) => void;
    loading?: boolean;
    error?: string | null;
}

const TaskInput: React.FC<TaskInputProps> = ({
                                                 defaultCategory,
                                                 onCreateTask,
                                                 loading,
                                                 error,
                                             }) => {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [category, setCategory] = useState<Category>(defaultCategory);
    const [status, setStatus] = useState<Status>(Status.TODO);
    const [priority, setPriority] = useState("Mittel");
    const [complexity, setComplexity] = useState("Normal");


    const handleSubmit = () => {
        if (!name.trim() || loading) return;
        onCreateTask({ name, details, dueDate, category, status, priority, complexity });
        setName("");
        setDetails("");
        setDueDate(null);
        setStatus(Status.TODO);
        setPriority("Mittel");
        setComplexity("Normal");
    };

    return (
        <div className="task-input-row">
            <TextField
                inputId={`task-name-${category}`}
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
                label="Fällig am"
                value={dueDate}
                onChange={(nextValue: Date | null) => setDueDate(nextValue)}
                disabled={loading}
            />

            <Select
                inputId={`task-category-${category}`}
                label="Kategorie"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCategory(e.target.value as Category)
                }
            >
                {Object.values(Category).map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </Select>

            <Select
                inputId={`task-status-${category}`}
                label="Status"
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(e.target.value as Status)
                }
            >
                {Object.values(Status).map((st) => (
                    <option key={st} value={st}>
                        {st}
                    </option>
                ))}
            </Select>

            <Select
                inputId={`task-priority-${category}`}
                label="Priorität"
                value={priority}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)}
            >
                <option value="Hoch">Hoch</option>
                <option value="Mittel">Mittel</option>
                <option value="Niedrig">Niedrig</option>
            </Select>

            <Select
                inputId={`task-complexity-${category}`}
                label="Komplexität"
                value={complexity}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setComplexity(e.target.value)}
            >
                <option value="Einfach">Einfach</option>
                <option value="Normal">Normal</option>
                <option value="Komplex">Komplex</option>
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
