import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodolistType | AddTodolistType | ChangeTodolistType | ChangeTodolistFilterType

export type RemoveTodolistType ={
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistType ={
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type  ChangeTodolistType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: string
}


export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...state].filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return [...state].map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error ('I dont understand this action type')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistAC = (todolistId: string, title: string): ChangeTodolistType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title}
}

export const changeTodolistFilterAC = (todolistId: string, filter: string): ChangeTodolistFilterType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter}
}

