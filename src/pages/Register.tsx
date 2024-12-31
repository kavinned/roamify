import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { registerThunk } from "../store/thunks/authThunks";
import Loader from "../components/Loader";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.auth);

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();

        const credentials = {
            name,
            email,
            password,
        };
        dispatch(registerThunk(credentials));
    }
    console.log(status, error);

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
