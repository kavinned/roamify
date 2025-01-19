import { Itinerary } from "../models/Itinerary";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
    selectedItinerary: Itinerary;
    handleCloseModal: () => void;
}

export default function ItineraryModal({
    selectedItinerary,
    handleCloseModal,
}: Props) {
    return (
        <div className="rounded-lg shadow-md bg-card text-foreground p-6">
            {selectedItinerary && (
                <>
                    <div className="pb-4 mb-4 border-b border-border">
                        <div className="flex justify-between items-center border-b border-border pb-4">
                            <h2 className="text-xl font-bold">
                                {selectedItinerary?.name}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="hover:opacity-75"
                            >
                                <AiFillCloseCircle size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4">
                            <h3 className="text-lg font-semibold">
                                {selectedItinerary.cityName}
                            </h3>
                            <img
                                src={selectedItinerary.cityImage}
                                alt={selectedItinerary.cityName}
                                className="w-24 h-24 object-cover rounded-full shadow-md"
                            />
                        </div>
                    </div>
                    <div className="pb-4 mb-4 border-b border-border">
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
                    </div>
                    <p className="mb-4 pb-4 border-b border-border">
                        Hotel: {selectedItinerary.hotel.name}
                    </p>
                    <h4 className="mb-2 font-semibold">Points of Interest</h4>
                    <ul className="list-outside list-disc">
                        {selectedItinerary.pointsOfInterest.map(
                            (poi, index) => (
                                <li key={index} className="ml-4">
                                    {poi.name}
                                </li>
                            )
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}
