import './Overview.css'
import { Accordion, AccordionSection, Text, Checkbox, TextField } from '@audi/audi-ui-react'
import { useState } from 'react'
import { Task } from '../../../model/Task.ts'
import { Category } from "../../../model/Category.ts"
import { createSubTask } from "../../../api/subtask-api.ts"
import { SubTask } from "../../../model/SubTask.ts"

interface OverviewProps {
    tasks: Task[]
}

const categoryLabels: Record<Category, string> = {
    [Category.BIZ]: "BIZ",
    [Category.VS]: "Versetzungsstelle",
    [Category.SONSTIGE]: "Sonstige",
}

const Overview: React.FC<OverviewProps> = ({ tasks }) => {
    const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({})
    const [inputVisibility, setInputVisibility] = useState<Record<number, boolean>>({})
    const [inputValues, setInputValues] = useState<Record<number, string>>({})

    const handleCheckboxChange = (taskId: number) => {
        setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }))
    }

    const handleInputChange = (taskId: number, value: string) => {
        setInputValues(prev => ({ ...prev, [taskId]: value }))
    }

    const toggleInput = (taskId: number) => {
        setInputVisibility(prev => ({ ...prev, [taskId]: !prev[taskId] }))
    }

    const handleAddSubtask = async (taskId: number) => {
        const name = inputValues[taskId]?.trim()
        if (!name) return

        const newSubtask: SubTask = { name, completed: false, taskId, details: '' }
        const result = await createSubTask(newSubtask)

        if (result) {
            console.log('Subtask erstellt:', result)
            setInputValues(prev => ({ ...prev, [taskId]: '' }))
            setInputVisibility(prev => ({ ...prev, [taskId]: false }))
        }
    }

    const categorizedTasks = tasks.reduce<Record<Category, Task[]>>((acc, task) => {
        const cat = categoryLabels[task.category] ? task.category : Category.SONSTIGE
        acc[cat] = acc[cat] || []
        acc[cat].push(task)
        return acc
    }, { [Category.BIZ]: [], [Category.VS]: [], [Category.SONSTIGE]: [] })

    return (
        <div className="overview-container">
            {Object.values(Category).map(category => (
                <div key={category} className="overview-column">
                    <div className="category-header">
                        <Text as="h1" weight="bold" variant="order4">
                            {categoryLabels[category]}
                        </Text>
                    </div>

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
                                    {task.subtasks?.length > 0 && (
                                        <div className="subtasks">
                                            {task.subtasks.map(sub => (
                                                <div key={sub.id} className="subtask-item">
                                                    <Checkbox inputId={`subtask-${sub.id}`} checked={sub.completed} />
                                                    <Text variant="copy1">{sub.name}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button className="round-plus-button" onClick={() => toggleInput(task.id)}>+</button>

                                    {inputVisibility[task.id] && (
                                        <div className="subtask-input-row">
                                            <TextField
                                                hideLabelOptional
                                                inputId={`text-field__${task.id}`}
                                                label="Aufgabe hinzufügen:"
                                                value={inputValues[task.id] || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    handleInputChange(task.id, e.target.value)
                                                }
                                            />
                                            <button
                                                className="subtask-add-button"
                                                onClick={() => handleAddSubtask(task.id)}
                                            >
                                                <Text id="button-text" variant="copy2">Bestätigen</Text>
                                            </button>
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

export default Overview
