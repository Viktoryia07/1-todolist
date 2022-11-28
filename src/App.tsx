import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export function App() {

    let [tasks1, setTasks1] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filterValueKey, setFilterValueKey] = useState("All")
    const removeTask = (taskId: string) => {
        setTasks1(tasks1.filter(el => el.id !== taskId))
    }
    const filterTasks = (filterKey: string) => {
        setFilterValueKey(filterKey)
    }
    function addTask(title: string) {
        let newTask = {id: v1(), title, isDone: false};
        let newTasks = [newTask, ...tasks1]
        setTasks1(newTasks);
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
            <Todolist title="What to learn"
                tasks={fooFilter()}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}/>
        </div>
    );
}

export default App;
