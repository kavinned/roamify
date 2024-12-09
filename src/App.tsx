import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import CustomSignIn from "./pages/CustomSignIn";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/sign-in" element={<CustomSignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/" element={<Index />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
