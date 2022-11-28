import React, {ChangeEvent, useState, KeyboardEvent, MouseEvent} from 'react';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterTasks: (filterKey: string) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const onAllClickHandler = () => {
        props.filterTasks("All")
    }
    const onActiveClickHandler = () => {
        props.filterTasks("Active")
    }
    const onCompletedClickHandler = () => {
        props.filterTasks("Completed")
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map( el => {
                const onClickHandler = () => {
                    props.removeTask(el.id)
                }
                return <li key={el.id}>
                        <button onClick={onClickHandler}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
            })
            }

        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
