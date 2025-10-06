import './Overview.css'
import {Accordion, AccordionSection, Text, Checkbox} from '@audi/audi-ui-react'
import {useState} from 'react'
import {Task} from '../model/Task'
import {Category} from "../model/Category.ts";

const categories = Object.values(Category);

interface OverviewProps {
    tasks: Task[]
}

const Overview: React.FC<OverviewProps> = ({tasks}) => {
    const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({})

    const handleCheckboxChange = (taskId: number) => {
        setCompletedTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId],
        }))
    }

    const categorizedTasks: Record<Category, Task[]> = {
        [Category.BIZ]: [],
        [Category.VS]: [],
        [Category.SONSTIGE]: [],
    };

    const categoryLabels: Record<Category, string> = {
        [Category.BIZ]: "BIZ",
        [Category.VS]: "Versetzungsstelle",
        [Category.SONSTIGE]: "Sonstige",
    };

    tasks.forEach(task => {
        if (categories.includes(task.category as Category)) {
            categorizedTasks[task.category as Category].push(task);
        } else {
            categorizedTasks[Category.SONSTIGE].push(task);
        }

    });

    return (
        <div className="overview-container">
            {categories.map(category => (
                <div key={category} className="overview-column">
                    <Text as="h1" weight="bold" variant="order4">
                        {categoryLabels[category as Category]}
                </Text>
                    <Accordion>
                        {categorizedTasks[category].map(task => (
                            <AccordionSection
                                key={task.id}
                                headingLevel="h2"
                                hint={`Fällig am ${new Date(task.dueDate).toLocaleDateString('de-DE')}`}
                                hintSeverity="informative"
                                id={`task-${task.id}`}
                                roleRegion
                                subline={task.details}
                                label={
                                    <div className="task-label">
                                        <Checkbox
                                            inputId={`checkbox-${task.id}`}
                                            checked={!!completedTasks[task.id]}
                                            onChange={() => handleCheckboxChange(task.id)}
                                        />
                                        <Text variant="order4" weight="bold">{task.name}</Text>
                                    </div>
                                }
                            >
                                <div className="accordion-content">
                                    {task.subtasks && task.subtasks.length > 0 && (
                                        <div className="subtasks">
                                            {task.subtasks.map(sub => (
                                                <div key={sub.id} className="subtask-item">
                                                    <Checkbox
                                                        inputId={`subtask-${sub.id}`}
                                                        checked={sub.completed}
                                                        onChange={() => {}}
                                                    />
                                                    <Text variant="copy1">{sub.name}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </AccordionSection>
                        ))}
                    </Accordion>
                </div>
            ))}
        </div>
    )
}

export default Overview;
