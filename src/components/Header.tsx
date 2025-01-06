import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutThunk } from "../store/thunks/authThunk";

export default function Header() {
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function handleLogout(event: { preventDefault: () => void }) {
        event.preventDefault();
        await dispatch(logoutThunk());
        navigate("/login");
    }

    return (
        <header>
            <nav>
                <span className="nav-section">
                    <NavLink to="/">Home</NavLink>
                    {isAuth && (
                        <>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/search">Search</NavLink>
                        </>
                    )}
                </span>
                <span className="nav-section auth-btns">
                    {!isAuth ? (
                        <>
                            <NavLink
                                className="bg-green-600 px-2 py-1 rounded-xl font-bold text-sm text-black text-opacity-85 hover:bg-green-700 border-2 border-opacity-50 border-slate-950"
                                to="/login"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                className="bg-sky-600 px-2 py-1 rounded-xl font-bold text-sm text-black text-opacity-85 hover:bg-sky-700 border-2 border-opacity-50 border-slate-950"
                                to="/register"
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <button
                            className="bg-green-600 px-2 py-1 rounded-xl font-bold text-sm text-black text-opacity-85 hover:bg-green-700 border-2 border-opacity-50 border-slate-950"
                            type="button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </span>
            </nav>
        </header>
    );
}
