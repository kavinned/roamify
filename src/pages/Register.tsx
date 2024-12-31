export default function Register() {
    return (
        <div className="form-wrapper">
            <form className="authform">
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
            </form>
        </div>
    );
}
