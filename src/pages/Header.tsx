import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <span className="nav-section">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </span>
                <span className="nav-section auth-btns">
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
                </span>
            </nav>
        </header>
    );
}
