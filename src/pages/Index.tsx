export default function Index() {
    const handleGet = () => {
        fetch("http://localhost:3000/api/users", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    const handleLogin = () => {
        fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: "a@a.com",
                password: "12345",
                // name: "ironman",
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <div>
            <button onClick={handleGet} className="bg-sky-500">
                Get /
            </button>
            <br />
            <br />
            <button onClick={() => handleLogin()} className="bg-sky-500">
                Login
            </button>
            <br />
            <br />
            <button className="bg-sky-500">Register</button>
        </div>
    );
}
