import { Button, Divider, Layout, NavigationBar, NavigationItem } from '@audi/audi-ui-react';
import './Header.css'


function Header() {

    return (
        <div className="header">
            <Layout justify="around" align="center">
                <div className="logo-container">
                    <img className="logo" src="/audi-fav.svg"></img>
                </div>
                <div className="text-container">
                    <p>AudiTrack</p>
                </div>
                <NavigationBar id="nav-bar" selected="overview" onSelect={() => {}}>
                    <NavigationItem id="overview">Overview</NavigationItem>
                </NavigationBar>
                <div className="button-container">
                    <input type="file" name="" id='grades-file-import' hidden></input>
                    <Button onClick={()=> alert("Hello!  I'm a button")} variant="secondary" icon="editorial" size="small">
                        click me
                    </Button>
                </div>
            </Layout>
            <Divider />
        </div>
    );
}

export default Header;