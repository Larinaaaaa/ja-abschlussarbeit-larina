import './Overview.css'
import { Task } from '../../../model/Task'
import { Category } from '../../../model/enums/Category.ts'
import TaskColumn from './TaskColumn'
import {useTasks} from "../../../hooks/useTasks.ts";
import {useSubTasks} from "../../../hooks/useSubtasks.ts";

const categoryLabels: Record<Category, string> = {
    [Category.BIZ]: "BIZ",
    [Category.VS]: "Versetzungsstelle",
    [Category.SONSTIGE]: "Sonstige",
}

const Overview: React.FC = () => {
    const { tasks, addTask, loading, error } = useTasks();
    const { subTasksByTask, addSubTask, updateSubTask } = useSubTasks();

    const categorizedTasks = tasks.reduce<Record<Category, Task[]>>((acc, task) => {
        const category = categoryLabels[task.category] ? task.category : Category.SONSTIGE
        acc[category] = acc[category] || []
        acc[category].push(task)
        return acc
    }, { [Category.BIZ]: [], [Category.VS]: [], [Category.SONSTIGE]: [] })

    return (
        <div className="overview-container">
            {Object.values(Category).map(category => (
                <TaskColumn
                    key={category}
                    title={categoryLabels[category]}
                    tasks={categorizedTasks[category]}
                    subTasksByTask={subTasksByTask}
                    handleCreateTask={addTask}
                    handleCreateSubtask={addSubTask}
                    handleUpdateSubtask={updateSubTask}
                    loading={loading}
                    error={error}
                />
            ))}
        </div>
    )
}

export default Overview;
