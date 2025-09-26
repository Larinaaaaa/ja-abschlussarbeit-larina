import './App.css'
import {Layout} from '@audi/audi-ui-react'
import Content from "./layout/Content";
import Header from "./layout/Header";
import {loadTasks} from "./api";
import {useState} from "react";

const tasks = await loadTasks();

function App() {
    const [activeModule] = useState('overview');
    return (
        <Layout direction="column" align="center">
            <Header/>
            <Content tasks={tasks} activeModule={activeModule}></Content>
        </Layout>
    )
}

export default App
