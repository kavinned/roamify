import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import { checkAuthStatus } from "./store/thunks/authThunk";
import Loader from "./components/Loader";
import Search from "./pages/Search";
import City from "./pages/City";
import DraftItinerary from "./pages/DraftItinerary";
import Itineraries from "./pages/Itineraries";

function App() {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    if (status === "loading") {
        return <Loader />;
    }

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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
