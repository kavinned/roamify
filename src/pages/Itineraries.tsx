import { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
    fetchItineraries,
    deleteItinerary,
} from "../store/thunks/itineraryThunk";
import { Itinerary } from "../models/Itinerary";
import Loader from "../components/Loader";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Itineraries = () => {
    const dispatch = useAppDispatch();
    const { itineraries, status } = useAppSelector((state) => state.itinerary);
    const [selectedItinerary, setSelectedItinerary] =
        useState<Itinerary | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchItineraries());
    }, [dispatch]);

    useDocumentTitle("Itineraries");

    useEffect(() => {
        if (id) {
            const itinerary = itineraries?.find(
                (itinerary) => itinerary._id === id
            );
            setSelectedItinerary(itinerary || null);
            if (itinerary) {
                dialogRef.current?.showModal();
            }
        } else if (!id && selectedItinerary) {
            dialogRef.current?.close();
            navigate("/itineraries");
        }
    }, [id, itineraries, navigate, selectedItinerary]);

    function handleDelete(itineraryId: string) {
        dispatch(deleteItinerary(itineraryId));
    }

    function handleOpenModal(itinerary: Itinerary) {
        setSelectedItinerary((itinerary) => itinerary);
        navigate(`/itineraries/${itinerary._id}`);
    }

    const handleCloseModal = useCallback(() => {
        dialogRef.current?.close();
        navigate("/itineraries");
    }, [navigate]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dialogRef.current === event.target) handleCloseModal();
        }
        const dialog = dialogRef.current;
        dialog?.addEventListener("click", handleClickOutside);
        return () => {
            dialog?.removeEventListener("click", handleClickOutside);
        };
    }, [handleCloseModal]);

    return (
        <div className="container">
            <h1>Itineraries</h1>
            <div className="flex flex-col p-3">
                {status === "loading" && <Loader />}
                {itineraries?.map((itinerary) => (
                    <span key={itinerary._id}>
                        <span>
                            {itinerary.name}
                            <p className="text-sm">{itinerary.cityName}</p>
                        </span>
                        <button onClick={() => handleOpenModal(itinerary)}>
                            View
                        </button>
                        <button
                            onClick={() =>
                                handleDelete(itinerary._id as string)
                            }
                        >
                            Delete
                        </button>
                    </span>
                ))}
            </div>
            <dialog
                ref={dialogRef}
                className="modal itinerary-modal backdrop:backdrop-blur-sm backdrop:backdrop-brightness-75"
            >
                {selectedItinerary && (
                    <Modal
                        selectedItinerary={selectedItinerary}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            </dialog>
        </div>
    );
};

export default Itineraries;
