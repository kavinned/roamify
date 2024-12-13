import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    );
}
