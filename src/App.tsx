import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Index />} />

                {/* To Be Protected Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
