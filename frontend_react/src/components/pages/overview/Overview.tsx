import './Overview.css'
import { Task } from '../../../model/Task'
import { Category } from '../../../model/Category'
import TaskColumn from './TaskColumn'

interface OverviewProps {
    tasks: Task[]
}

const categoryLabels: Record<Category, string> = {
    [Category.BIZ]: "BIZ",
    [Category.VS]: "Versetzungsstelle",
    [Category.SONSTIGE]: "Sonstige",
}

const Overview: React.FC<OverviewProps> = ({ tasks }) => {
    const categorizedTasks = tasks.reduce<Record<Category, Task[]>>((acc, task) => {
        const cat = categoryLabels[task.category] ? task.category : Category.SONSTIGE
        acc[cat] = acc[cat] || []
        acc[cat].push(task)
        return acc
    }, { [Category.BIZ]: [], [Category.VS]: [], [Category.SONSTIGE]: [] })

    return (
        <div className="overview-container">
            {Object.values(Category).map(category => (
                <TaskColumn
                    key={category}
                    title={categoryLabels[category]}
                    tasks={categorizedTasks[category]}
                />
            ))}
        </div>
    )
}

export default Overview
