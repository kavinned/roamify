import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";

export default function DraftItineraryBtn() {
    const [show, setShow] = useState(false);
    const { isAuth } = useAppSelector((state) => state.auth);
    const { pointsOfInterest, hotel } = useAppSelector((state) => state.draft);

    useEffect(() => {
        if (isAuth && (pointsOfInterest.length > 0 || hotel.length > 0)) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [pointsOfInterest, hotel, isAuth]);

    return (
        <NavLink
            className={`bg-sky-600 px-4 py-2 rounded-xl font-bold text-sm text-black 
            text-opacity-85 hover:bg-sky-700 border-2 border-opacity-50 border-slate-950 
            fixed bottom-4 right-4 z-50 opacity-85 hover:opacity-100 ${
                show ? "block" : "hidden"
            }`}
            to="/"
        >
            View Itinerary Draft
        </NavLink>
    );
}
