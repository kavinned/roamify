import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import ModeToggle from "./components/ModeToggle";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <App />
                <ModeToggle />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
