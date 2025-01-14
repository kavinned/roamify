import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";

export default function DraftItineraryBtn() {
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const { isAuth } = useAppSelector((state) => state.auth);
    const { pointsOfInterest, hotel } = useAppSelector((state) => state.draft);

    useEffect(() => {
        if (isAuth && (pointsOfInterest.length > 0 || hotel)) {
            setShow(true);
            setExpanded(true);
        } else {
            setShow(false);
        }
    }, [pointsOfInterest, hotel, isAuth]);

    useEffect(() => {
        if (show) {
            setTimeout(() => setExpanded(false), 3000);
        }
    }, [show]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setExpanded(true);
            } else {
                setTimeout(() => setExpanded(false), 3000);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <NavLink
            className={`bg-sky-600 px-4 py-2 rounded-xl font-bold text-sm text-black 
            text-opacity-85 hover:bg-sky-700 border-2 border-opacity-50 border-slate-950 
            fixed bottom-4 right-4 z-50 opacity-85 hover:opacity-100 max-h-10 min-h-10 overflow-hidden transition-all duration-200 ease-in-out text-nowrap ${
                show ? "block" : "hidden"
            } ${expanded ? "w-auto text-opacity-100" : "w-12"}`}
            to="/itinerary/draft"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {expanded ? (
                "View Draft Itinerary"
            ) : (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <FaChevronCircleLeft />
                </div>
            )}
        </NavLink>
    );
}
