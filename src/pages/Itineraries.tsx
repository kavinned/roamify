import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
    fetchItineraries,
    deleteItinerary,
} from "../store/thunks/itineraryThunk";
import { Itinerary } from "../models/Itinerary";
import Loader from "../components/Loader";

const Itineraries = () => {
    const dispatch = useAppDispatch();
    const { itineraries, status } = useAppSelector((state) => state.itinerary);
    const [selectedItinerary, setSelectedItinerary] =
        useState<Itinerary | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dispatch(fetchItineraries());
    }, [dispatch]);

    function handleDelete(id: string) {
        dispatch(deleteItinerary(id));
    }

    function handleOpenModal(itinerary: Itinerary) {
        setSelectedItinerary(itinerary);
        dialogRef.current?.showModal();
    }

    function handleCloseModal() {
        dialogRef.current?.close();
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dialogRef.current === event.target) handleCloseModal();
        }
        const dialog = dialogRef.current;
        dialog?.addEventListener("click", handleClickOutside);
        return () => {
            dialog?.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="container">
            {status === "loading" && <Loader />}
            <h1>Itineraries</h1>
            <ul className="flex flex-col p-3">
                {itineraries?.map((itinerary) => (
                    <li key={itinerary._id}>
                        <span onClick={() => handleOpenModal(itinerary)}>
                            {itinerary.name}
                        </span>
                        <button
                            onClick={() =>
                                handleDelete(itinerary._id as string)
                            }
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <dialog
                ref={dialogRef}
                className="modal itinerary-modal backdrop:backdrop-blur-sm backdrop:backdrop-brightness-75"
            >
                <div className="modal-content">
                    {selectedItinerary && (
                        <>
                            <h2>{selectedItinerary.name}</h2>
                            <p>
                                Start Date:{" "}
                                {new Date(
                                    selectedItinerary.startDate
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                End Date:{" "}
                                {new Date(
                                    selectedItinerary.endDate
                                ).toLocaleDateString()}
                            </p>
                            <p>Hotel: {selectedItinerary.hotel.name}</p>
                            <h3>Points of Interest</h3>
                            <ul>
                                {selectedItinerary.pointsOfInterest.map(
                                    (poi, index) => (
                                        <li key={index}>{poi.name}</li>
                                    )
                                )}
                            </ul>
                        </>
                    )}
                    <button onClick={handleCloseModal}>Close</button>
                </div>
            </dialog>
        </div>
    );
};

export default Itineraries;
