import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { registerThunk } from "../store/thunks/authThunk";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

interface Credentials {
    email: string;
    password: string;
    name: string;
}

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status, error, isAuth } = useAppSelector((state) => state.auth);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const credentials: Credentials = {
            name: formObject.name as string,
            email: formObject.email as string,
            password: formObject.password as string,
        };
        dispatch(registerThunk(credentials));
    }

    useEffect(() => {
        if (status === "succeeded")
            navigate("/login", {
                state: {
                    message: {
                        register:
                            "Registration Successful.,Please Login to Continue.",
                    },
                },
            });
    }, [navigate, status]);

    useEffect(() => {
        if (isAuth) navigate("/dashboard");
    }, [isAuth, navigate]);

    return (
        <div className="form-wrapper">
            {status === "loading" && <Loader />}
            <form onSubmit={handleSubmit} className="authform">
                <span className="flex flex-col">
                    <label htmlFor="user-name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="user-name"
                        placeholder="Enter your name"
                    />
                </span>
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
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
