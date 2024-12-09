import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <SignedOut>
                    {!location.pathname.includes("sign-in") && (
                        <SignInButton
                            forceRedirectUrl="/dashboard"
                            mode="modal"
                        />
                    )}
                </SignedOut>
                <SignedIn>
                    <Link to="/dashboard">Dashboard</Link>
                    <UserButton />
                </SignedIn>
            </nav>
        </header>
    );
}
