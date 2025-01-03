import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginThunk } from "../store/thunks/authThunks";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";

interface Credentials {
    email: string;
    password: string;
}

export default function Login() {
    const dispatch = useAppDispatch();
    const { status, error, isAuth, user } = useAppSelector(
        (state) => state.auth
    );
    const location = useLocation();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSuccessMessage([]);
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const credentials: Credentials = {
            email: formObject.email as string,
            password: formObject.password as string,
        };
        dispatch(loginThunk(credentials));
    }

    useEffect(() => {
        if (location.state?.message?.register) {
            const messageArray = location.state.message.register.split(",");
            setSuccessMessage(messageArray);
            const timer = setTimeout(() => {
                setSuccessMessage([]);
                navigate(location.pathname, { replace: true });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [location, navigate]);

    useEffect(() => {
        if (isAuth) navigate("/dashboard");
    }, [isAuth, navigate, status]);

    console.log(user);

    return (
        <div className="form-wrapper relative">
            {status === "loading" && <Loader />}
            <form onSubmit={handleSubmit} className="authform">
                <span className="flex flex-col">
                    <label htmlFor="user-email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="user-email"
                        placeholder="Enter an Email Address"
                    />
                </span>
                <span className="flex flex-col">
                    <label htmlFor="user-password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="user-password"
                        placeholder="Enter a Password"
                    />
                </span>
                <button type="submit">Login</button>
                {successMessage.length > 0 && (
                    <div className="success-message text-green-500 mb-4">
                        {successMessage.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                )}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
