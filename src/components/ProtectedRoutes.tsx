import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function ProtectedRoutes() {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    if (!isAuth) {
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);

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
