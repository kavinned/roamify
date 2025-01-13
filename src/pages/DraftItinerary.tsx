import { draftItinerary } from "../store/reducers/draftItinerarySlice";

export default function DraftItinerary() {
    const draftItinerary: draftItinerary = JSON.parse(
        localStorage.getItem("draftItinerary") || "{}"
    );

    const { endDate, hotel, name, pointsOfInterest, startDate } =
        draftItinerary;

    console.log(draftItinerary);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <form
                className="draft-form overflow-y-auto"
                onSubmit={handleSubmit}
            >
                <div className="max-h-[33rem] min-w-[90%] max-w[90%] flex gap-3 flex-col">
                    <div className="form-span">
                        <label>Name:</label>
                        <input type="text" value={name} />
                    </div>
                    <div className="form-span">
                        <label>Start Date:</label>
                        <input type="date" value={startDate} />
                    </div>
                    <div className="form-span">
                        <label>End Date:</label>
                        <input type="date" value={endDate} />
                    </div>
                    <div className="form-span">
                        <label>Hotel:</label>
                        <details>
                            <summary>Hotel Details</summary>
                            {hotel ? (
                                <div>
                                    <p>
                                        <strong>Name:</strong> {hotel.name}
                                    </p>
                                    <p>
                                        <strong>Stars:</strong> {hotel.stars}
                                    </p>
                                    <p>
                                        <strong>Image:</strong>{" "}
                                        <img
                                            src={hotel.image}
                                            alt={hotel.name}
                                            className="hotel-img"
                                        />
                                    </p>
                                    <p>
                                        <strong>Distance:</strong>{" "}
                                        {hotel.distance}
                                    </p>
                                    <p>
                                        <strong>Distance From Poi:</strong>{" "}
                                        {hotel.distanceFromPoi}
                                    </p>
                                    <p>
                                        <strong>Price Per Night:</strong>{" "}
                                        {hotel.pricePerNight}
                                    </p>
                                    <p>
                                        <strong>Cheapest Partner:</strong>{" "}
                                        {hotel.cheapestPartner}
                                    </p>
                                </div>
                            ) : (
                                <p>No Hotel Chosen.</p>
                            )}
                        </details>
                    </div>
                    <div className="form-span">
                        <label>Points of Interest:</label>
                        <details>
                            <summary>Points of Interest Details</summary>
                            {pointsOfInterest.map((p, index) => (
                                <details key={index}>
                                    <summary className="poi-content">
                                        {index + 1}. {p.name}
                                    </summary>
                                    <div className="poi-content">
                                        <p>
                                            <strong>Address:</strong>{" "}
                                            {p.address}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> {p.phone}
                                        </p>
                                        <p>
                                            <strong>Site:</strong> {p.site}
                                        </p>
                                        <p>
                                            <strong>Types:</strong>{" "}
                                            {p.types.join(", ")}
                                        </p>
                                    </div>
                                </details>
                            ))}
                        </details>
                        <button className="w-1/2 self-center" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
