import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let currentTitle = "What to do 1"
    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]

    return (
        <div className="App">
            <Todolist title={currentTitle} task={tasks1}/>
            <Todolist title={"What to do 2"} task={tasks2}/>
        </div>
    );
}

export default App;