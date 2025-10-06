import { SubTask } from './SubTask.ts'
import {Status} from "./Status.ts";
import {Category} from "./Category.ts";

export interface Task {
    id: number
    name: string
    created: string
    dueDate: string
    details: string
    category: Category
    priority: string
    complexity: string
    status: Status
    subtasks: SubTask[]
}
