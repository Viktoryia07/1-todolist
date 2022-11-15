import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=> void
    filterTasks: (filterKey: string)=> void

}

export function Todolist(props: PropsType) {

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(function (el) {
                return (
                    <li key={el.id}>
                        <button onClick={()=>{props.removeTask(el.id)}}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={()=>props.filterTasks("All")}>All</button>
            <button onClick={()=>props.filterTasks("Active")}>Active</button>
            <button onClick={()=>props.filterTasks("Completed")}>Completed</button>
        </div>
    </div>
}
