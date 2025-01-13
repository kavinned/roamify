import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { registerThunk } from "../store/thunks/authThunk";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface Credentials {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status, error, isAuth } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const credentials: Credentials = {
            name: formObject.name as string,
            email: formObject.email as string,
            password: formObject.password as string,
            confirmPassword: formObject.confirmPassword as string,
        };

        if (credentials.password !== credentials.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
            alert("Invalid email format");
            return;
        }

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
        <div className="container">
            {status === "loading" && <Loader />}
            <form onSubmit={handleSubmit} className="authform">
                <span className="form-span">
                    <label htmlFor="user-name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="user-name"
                        placeholder="Enter your name"
                    />
                </span>
                <span className="form-span">
                    <label htmlFor="user-email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="user-email"
                        placeholder="Enter an Email Address"
                    />
                </span>
                <span className="form-span">
                    <label htmlFor="user-password">Password:</label>
                    <span className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="user-password"
                            placeholder="Enter a Password"
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-fit"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <AiFillEye size={20} />
                            ) : (
                                <AiFillEyeInvisible size={20} />
                            )}
                        </div>
                    </span>
                </span>
                <span className="form-span">
                    <label htmlFor="user-confirm-password">
                        Confirm Password:
                    </label>
                    <span className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="user-confirm-password"
                            placeholder="Confirm your Password"
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-fit"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <AiFillEye size={20} />
                            ) : (
                                <AiFillEyeInvisible size={20} />
                            )}
                        </div>
                    </span>
                </span>
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
