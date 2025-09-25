import { Button, Divider, Layout, NavigationBar, NavigationItem } from '@audi/audi-ui-react';
import './Header.css'


function Header() {

    return (
        <div className="header">
            <Layout justify="around" align="center">
                <div className="text-container">
                    <p>AudiTrack</p>
                </div>
                <NavigationBar id="nav-bar" selected="overview" onSelect={() => {}}>
                    <NavigationItem id="overview">Übersicht</NavigationItem>
                    <NavigationItem id="canban">Canban Board</NavigationItem>
                    <NavigationItem id="week">Wochenansicht</NavigationItem>
                    <div style={{ marginLeft: '50px' }}>
                        <NavigationItem id="backlog">Backlog</NavigationItem>
                    </div>
                </NavigationBar>
                <div className="logo-container">
                    <img className="logo" src="/audi-fav.svg"></img>
                </div>
            </Layout>
            <Divider />
        </div>
    );
}

export default Header;