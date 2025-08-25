import './App.css'
import {Layout} from '@audi/audi-ui-react'
import Content from "./layout/Content";
import Header from "./layout/Header";
import {loadAnimals} from "./api";
import {useState} from "react";

const animals = await loadAnimals();

function App() {
    const [activeModule] = useState('overview');
    return (
        <Layout direction="column" align="center">
            <Header/>
            <Content animals={animals} activeModule={activeModule}></Content>
        </Layout>
    )
}

export default App

