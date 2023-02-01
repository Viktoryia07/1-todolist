import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('tasks should be deleted', () => {
        const startState: TasksStateType = {
            'tdlistId1': [    // "id_1"
                {id: '1', title: "HTML & CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "React", isDone: false},
            ],
            'tdlistId2': [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Meat", isDone: true},
                {id: '3', title: "Wheat", isDone: false},
            ]
        }

        const action = removeTaskAC('2', 'tdlistId2');
        const endState = tasksReducer(startState, action)

        expect(endState['tdlistId1'].length).toBe(3)
        expect(endState['tdlistId2'].length).toBe(2)
        expect(endState['tdlistId2'].every(t => t.id != '2')).toBeTruthy()
    }
)

test('tasks should be added', () => {
        const startState: TasksStateType = {
            'tdlistId1': [    // "id_1"
                {id: '1', title: "HTML & CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "React", isDone: false},
            ],
            'tdlistId2': [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Meat", isDone: true},
                {id: '3', title: "Wheat", isDone: false},
            ]
        }

        const action = addTaskAC('juice', 'tdlistId2');
        const endState = tasksReducer(startState, action)

        expect(endState['tdlistId1'].length).toBe(3)
        expect(endState['tdlistId2'].length).toBe(4)
        expect(endState['tdlistId2'][0].title).toBe('juice')
    }
)

test('task title should be changed', () => {
        const startState: TasksStateType = {
            'tdlistId1': [    // "id_1"
                {id: '1', title: "HTML & CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "React", isDone: false},
            ],
            'tdlistId2': [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Meat", isDone: true},
                {id: '3', title: "Wheat", isDone: false},
            ]
        }

        const action = changeTaskTitleAC('2', 'Water', 'tdlistId2');
        const endState = tasksReducer(startState, action)

        expect(endState['tdlistId2'][1].title).toBe("Water")
    }
)

test('task status should be changed', () => {
        const startState: TasksStateType = {
            'tdlistId1': [    // "id_1"
                {id: '1', title: "HTML & CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "React", isDone: false},
            ],
            'tdlistId2': [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Meat", isDone: true},
                {id: '3', title: "Wheat", isDone: false},
            ]
        }

        const action = changeTaskStatusAC('2', false, 'tdlistId2');
        const endState = tasksReducer(startState, action)

        expect(endState['tdlistId2'][1].isDone).toBe(false)
    }
)

test('new array should be added when new tdlist wiil be added', () => {
        const startState: TasksStateType = {
            'tdlistId1': [    // "id_1"
                {id: '1', title: "HTML & CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "React", isDone: false},
            ],
            'tdlistId2': [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Meat", isDone: true},
                {id: '3', title: "Wheat", isDone: false},
            ]
        }

        const action = addTodolistAC('new todolist');
        const endState = tasksReducer(startState, action)

        const keys = Object.keys(endState)
        const newKey = keys.find(k => k != "tdlistId1" && k != "tdlistId2")
        if (!newKey) {
            throw Error('new key should be added')
        }
        expect(keys.length).toBe(3)
        expect(endState[newKey]).toEqual([])
    })

test('property with todolisId should be deleted', () => {
    const startState: TasksStateType = {
        'tdlistId1': [    // "id_1"
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'tdlistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "Meat", isDone: true},
            {id: '3', title: "Wheat", isDone: false},
        ]
    }

    const action = removeTodolistAC('tdlistId2');
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(!endState['todolistId2']).not.toBeUndefined()
})

