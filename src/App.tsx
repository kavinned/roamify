import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { setUser } from "./store/reducers/authReducer";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function checkAuth() {
            const response = await fetch("/api/users/verify");
            const data = await response.json();
            if (data._id) dispatch(setUser(data));
        }
        checkAuth();
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* To Be Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
