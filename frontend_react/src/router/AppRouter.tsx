import { Routes, Route, Navigate } from "react-router-dom";
import Overview from "../components/pages/overview/Overview";
import { Task } from "../model/Task";

interface AppRouterProps {
    tasks: Task[];
}

const AppRouter: React.FC<AppRouterProps> = ({ tasks }) => (
    <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Overview tasks={tasks} />} />
    </Routes>
);

export default AppRouter;
