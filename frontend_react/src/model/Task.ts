import { SubTask } from './SubTask.ts'
import {Status} from "./Status.ts";

export interface Task {
    id: number
    name: string
    created: string
    dueDate: string
    details: string
    category: string
    priority: string
    complexity: string
    status: Status
    subtasks: SubTask[]
}
