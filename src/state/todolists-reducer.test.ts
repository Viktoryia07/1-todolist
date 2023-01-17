import {
    AddTodolistAC,
    ChangeTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterType,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from "../App";


test('correct todolist should be removed', () => {
    let id_1 = v1();
    let id_2 = v1();

    const startState: Array<TodoListType> = [
        {id: id_1, title: "What to learn", filter: "all"},
        {id: id_2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(id_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(id_2)
})

test('correct todolist should be added', () => {
    let id_1 = v1();
    let id_2 = v1();

    let newTodoListTitle = 'NewTodoList'

    const startState: Array<TodoListType> = [
        {id: id_1, title: "What to learn", filter: "all"},
        {id: id_2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let id_1 = v1();
    let id_2 = v1();

    let newTodoListTitle = 'NewTodoList'

    const startState: Array<TodoListType> = [
        {id: id_1, title: "What to learn", filter: "all"},
        {id: id_2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistAC(id_2, newTodoListTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct todolist should be changed', () => {
    let id_1 = v1();
    let id_2 = v1();

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListType> = [
        {id: id_1, title: "What to learn", filter: "all"},
        {id: id_2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(id_2, newFilter))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].filter).toBe(newFilter)
})

