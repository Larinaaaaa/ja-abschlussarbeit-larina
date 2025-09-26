import { Divider, Layout, NavigationBar, NavigationItem, Text } from '@audi/audi-ui-react';
import './Header.css'


function Header() {

    return (
        <div className="header">
            <Layout justify="around" align="center">
                <Text
                    as="h3"
                    weight="bold"
                    variant="order3"
                >
                    Azubi Track&Check
                </Text>
                <div className="centered-navbar">
                    <NavigationBar
                        aria-label="Aria Label"
                        id="nav-bar__basic"
                        onSelect={() => {}}
                        selected="overview"
                    >
                        <NavigationItem id="overview">Übersicht</NavigationItem>
                        <NavigationItem id="canban">Canban Board</NavigationItem>
                        <NavigationItem id="week">Wochenansicht</NavigationItem>
                    </NavigationBar>
                </div>
                <div className={"header-backlog"}>
                    <NavigationBar
                        aria-label="Aria Label"
                        id="nav-bar__basic"
                        onSelect={() => {}}
                        selected="overview"
                    >
                        <NavigationItem id="backlog">Backlog</NavigationItem>
                    </NavigationBar>
                </div>
                <div className="logo-container">
                    <img className="logo" src="/audi-fav.svg"></img>
                </div>
            </Layout>
            <Divider />
        </div>
    );
}

export default Header;