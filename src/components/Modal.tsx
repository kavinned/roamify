import { Itinerary } from "../models/Itinerary";

interface Props {
    selectedItinerary: Itinerary;
    handleCloseModal: () => void;
}

export default function Modal({ selectedItinerary, handleCloseModal }: Props) {
    return (
        <div className="modal-content">
            {selectedItinerary && (
                <>
                    <h2>{selectedItinerary.name}</h2>
                    <div className="flex flex-col items-center gap-3">
                        <h3>{selectedItinerary.cityName}</h3>
                        <img
                            src={selectedItinerary.cityImage}
                            alt={selectedItinerary.cityName}
                            className="w-32 h-32 object-cover rounded-full"
                        />
                    </div>
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
    );
}
