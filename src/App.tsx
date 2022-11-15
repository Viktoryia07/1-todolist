import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export function App() {

    let [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])
    const [filterValueKey, setFilterValueKey] = useState("All")
    const removeTask = (taskId: number) => {
        setTasks1(tasks1.filter(el => el.id !== taskId))
    }
    const filterTasks = (filterKey: string) => {
        setFilterValueKey(filterKey)
    }


    const fooFilter = () => {
        let filteredTasks = tasks1
        if (filterValueKey === "Active") {
            filteredTasks = tasks1.filter(el => !el.isDone)
        }
        if (filterValueKey === "Completed") {
            filteredTasks = tasks1.filter(el => el.isDone)
        }
        return filteredTasks;
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={fooFilter()}
                removeTask={removeTask}
                filterTasks={filterTasks}/>
        </div>
    );
}

export default App;
