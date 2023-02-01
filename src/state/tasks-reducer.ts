import {FilterValuesType, TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolists-reducer";


export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

type ActionsType = RemoveTaskType | AddTaskType | ChangeTaskTitleType | ChangeTaskStatusType | AddTodolistType | RemoveTodolistType


    export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copy[action.todolistId] = filteredTasks
            return copy
        }
        case "ADD-TASK": {
            const copy = {...state}
            const tasks = copy[action.todolistId]
            const newTasks = [{id: v1(), title: action.title, isDone: false}, ...tasks]
            copy[action.todolistId] = newTasks
            return copy
        }
        case "CHANGE-TASK-TITLE": {
            const copy = {...state}
            const tasks = copy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return copy
        }
        case "CHANGE-TASK-STATUS": {
            const copy = {...state}
            const tasks = copy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return copy
        }
        case "ADD-TODOLIST": {
            const copy = {...state}
            copy[action.todolistId] = []
            return copy
        }
        case "REMOVE-TODOLIST": {
            const copy = {...state}
            delete copy[action.id]
            return  copy
        }
        default:
            throw new Error('I dont understand this action type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}



