import './Content.css';
import Overview from "../components/Overview";
import {Animals} from "../model/Animals.ts";
import {ContentCard, Text} from "@audi/audi-ui-react";

interface ContentProps {
  activeModule: string;
  animals: Animals[];
}

const renderContent = (activeModule: string, animals: Animals[]) => {
  switch (activeModule) {
    case 'overview':
      return <Overview animals={animals} />;
    default:
      return <ContentCard>
        <Text variant="order3" spaceStackEnd="xxs">
          This is a default
        </Text>
        <Text variant="copy1">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua.
        </Text>

      </ContentCard>;
  }
}

function Content(props: ContentProps) {
  return (
    <div className="content">
      {renderContent(props.activeModule, props.animals)}
    </div>
  );
}

export default Content;