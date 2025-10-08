import { BrowserRouter } from "react-router-dom";
import { Layout } from "@audi/audi-ui-react";
import Header from "./components/layout/Header";
import AppRouter from "./router/AppRouter";
import { useTasks } from "./hooks/useTasks";

function App() {
    const { tasks, loading } = useTasks();

    if (loading) return <div>Loading...</div>;

    return (
        <BrowserRouter>
            <Layout direction="column" align="center">
                <Header />
                <AppRouter tasks={tasks} />
            </Layout>
        </BrowserRouter>
    );
}

export default App;
