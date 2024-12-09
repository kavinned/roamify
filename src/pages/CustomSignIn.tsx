import { SignIn } from "@clerk/clerk-react";

export default function CustomSignIn() {
    return (
        <div className="auth-container">
            <SignIn routing="path" path="/sign-in" />
        </div>
    );
}
