import { Itinerary } from "../models/Itinerary";
import { draftItinerary } from "../store/reducers/draftItinerarySlice";
import { useAppDispatch } from "../store/store";
import { createItinerary } from "../store/thunks/itineraryThunk";

export default function DraftItinerary() {
    const dispatch = useAppDispatch();
    const draftItineraryData: draftItinerary = JSON.parse(
        localStorage.getItem("draftItinerary") || "{}"
    );

    const {
        endDate,
        hotel,
        name,
        pointsOfInterest,
        startDate,
        cityName,
        cityImage,
    } = draftItineraryData;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!hotel) return;
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData);
        const itineraryData: Itinerary = {
            name: formValues.name as string,
            startDate: new Date(formValues.startDate as string),
            endDate: new Date(formValues.endDate as string),
            pointsOfInterest: pointsOfInterest,
            hotel: hotel ?? null,
            cityName: cityName,
            cityImage: cityImage,
        };
        console.log(itineraryData);
        dispatch(createItinerary(itineraryData));
    }

    return (
        <div className="container">
            <form
                className="draft-form overflow-y-auto"
                onSubmit={handleSubmit}
            >
                <div className="max-h-[40rem] min-w-[90%] max-w[90%] flex gap-3 flex-col">
                    <div className="flex flex-col items-center gap-3">
                        <h2>{cityName}</h2>
                        <img
                            src={cityImage}
                            alt={cityName}
                            className="w-32 h-32 object-cover rounded-full"
                        />
                    </div>
                    <div className="form-span">
                        <label>Name:</label>
                        <input type="text" name="name" defaultValue={name} />
                    </div>
                    <div className="form-span">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            defaultValue={startDate}
                        />
                    </div>
                    <div className="form-span">
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            defaultValue={endDate}
                        />
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
