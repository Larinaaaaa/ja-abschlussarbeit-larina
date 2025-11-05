import { SubTask } from './SubTask.ts';
import {Status} from "./enums/Status.ts";
import {Category} from "./enums/Category.ts";
import {Priority} from "./enums/Priority.ts";
import {Complexity} from "./enums/Complexity.ts";

export interface Task {
    id?: number
    name: string
    created: string
    dueDate: string | undefined;
    details: string
    category: Category
    priority: Priority
    complexity: Complexity
    status: Status
    subtasks: SubTask[]
}