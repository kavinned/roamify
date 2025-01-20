import { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
    fetchItineraries,
    deleteItinerary,
} from "../store/thunks/itineraryThunk";
import { Itinerary } from "../models/Itinerary";
import Loader from "../components/Loader";
import { useParams, useNavigate } from "react-router-dom";
import ItineraryModal from "../components/ItineraryModal";
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
        <div className="mx-auto p-4 flex flex-col text-foreground">
            <h1 className="mt-16 text-3xl font-bold mb-4">Itineraries</h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {status === "loading" && <Loader />}
                {itineraries?.map((itinerary) => (
                    <div
                        key={itinerary._id}
                        className="rounded-md shadow-md p-4 flex items-center justify-between bg-card  border-border/50 border drop-shadow-md"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">
                                {itinerary.name}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {itinerary.cityName}
                            </p>
                            <p className="text-xs text-muted-foreground/50">
                                {new Date(
                                    itinerary.startDate
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                    itinerary.endDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleOpenModal(itinerary)}
                                className="bg-primary hover:bg-primary-foreground text-primary-foreground font-bold py-2 px-4 rounded"
                            >
                                View
                            </button>
                            <button
                                onClick={() =>
                                    handleDelete(itinerary._id as string)
                                }
                                className="bg-destructive hover:bg-destructive-foreground text-destructive-foreground font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <dialog
                ref={dialogRef}
                className="itinerary-modal backdrop:backdrop-blur-sm backdrop:backdrop-brightness-75 rounded-lg p-4 bg-popover text-popover-foreground md:w-2/5 h-max w-full"
            >
                {selectedItinerary && (
                    <ItineraryModal
                        selectedItinerary={selectedItinerary}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            </dialog>
        </div>
    );
};
export default Itineraries;
