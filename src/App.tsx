import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { checkAuthStatus } from "./store/thunks/authThunk";
import Search from "./pages/Search";
import City from "./pages/City";
import DraftItinerary from "./pages/DraftItinerary";
import Itineraries from "./pages/Itineraries";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/search" element={<Search />} />
                <Route path="/city" element={<City />} />
                {/* To Be Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route
                        path="/itinerary/draft"
                        element={<DraftItinerary />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/itineraries" element={<Itineraries />} />
                    <Route path="/itineraries/:id" element={<Itineraries />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
