import {TasksStateType, TodoListType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equels', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: TodoListType[] = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})