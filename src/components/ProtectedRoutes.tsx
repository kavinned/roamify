import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect } from "react"; // Import useEffect

export default function ProtectedRoutes() {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    useEffect(() => {
        if (!isAuth) {
            // Set a timeout to redirect after 2 seconds
            const timer = setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

            // Cleanup the timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [isAuth]); // Run this effect when `isAuth` changes

    if (!isAuth) {
        return (
            <div className="flex flex-col gap-5 w-screen h-screen z-50 items-center justify-center text-3xl">
                <p>Unauthorized. Redirecting to login...</p>
                <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return <Outlet />;
}
