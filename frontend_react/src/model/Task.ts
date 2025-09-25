import { SubTask } from './SubTask.ts'

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

export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    CANCELLED = "CANCELLED"
}
