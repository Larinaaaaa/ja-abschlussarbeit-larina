import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import {audiLightTheme, ThemeProvider} from "@audi/audi-ui-react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={{...audiLightTheme, iconBasePath: './icons/audi'}}>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
