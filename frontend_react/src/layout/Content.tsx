import './Content.css';
import Overview from "../components/Overview";
import {Task} from "../model/Task.ts";
import {ContentCard, Text} from "@audi/audi-ui-react";

interface ContentProps {
  activeModule: string;
  tasks: Task[];
}

const renderContent = (activeModule: string, tasks: Task[]) => {
    switch (activeModule) {
        case 'overview':
            return <Overview tasks={tasks}></Overview>;
        default:
            return (
                <ContentCard>
                    <Text variant="order3" spaceStackEnd="xxs">This is a default</Text>
                    <Text variant="copy1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr...
                    </Text>
                </ContentCard>
            );
    }
}

function Content({ activeModule, tasks }: ContentProps) {
    return (
        <div className="content">
            {renderContent(activeModule, tasks)}
        </div>
    );
}

export default Content;