import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { registerThunk } from "../store/thunks/authThunks";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status, error, isAuth } = useAppSelector((state) => state.auth);

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();

        const credentials = {
            name,
            email,
            password,
        };
        dispatch(registerThunk(credentials));
    }

    useEffect(() => {
        if (status === "succeeded") navigate("/login");
    }, [navigate, status]);

    useEffect(() => {
        if (isAuth) navigate("/dashboard");
    }, [isAuth, navigate]);

    console.log(isAuth);
    

    return (
        <div className="form-wrapper">
            {status === "loading" && <Loader />}
            <form className="authform">
                <span className="flex flex-col">
                    <label htmlFor="user-name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="user-name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </span>
                <span className="flex flex-col">
                    <label htmlFor="user-email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="user-email"
                        placeholder="Enter an Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </span>
                <span className="flex flex-col">
                    <label htmlFor="user-password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="user-password"
                        placeholder="Enter a Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </span>
                <button onClick={handleSubmit} type="submit">
                    Register
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
