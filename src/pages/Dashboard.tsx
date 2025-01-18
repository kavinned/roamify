import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Dashboard() {
    useDocumentTitle("Dashboard");

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <h2>Dashboard</h2>
        </div>
    );
}
