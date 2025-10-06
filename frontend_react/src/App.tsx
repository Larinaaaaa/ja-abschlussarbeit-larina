import './App.css'
import {Layout} from '@audi/audi-ui-react'
import Content from "./layout/Content";
import Header from "./layout/Header";
import {loadTasks} from "./service/task-api.ts";
import {useEffect, useState} from "react";
import {Task} from "./model/Task";

function App() {
    const [activeModule] = useState('overview');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await loadTasks();
                setTasks(data);
            } catch (err) {
                console.error("Fehler beim Laden der Tasks:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout direction="column" align="center">
            <Header/>
            <Content tasks={tasks} activeModule={activeModule}></Content>
        </Layout>
    )
}

export default App

