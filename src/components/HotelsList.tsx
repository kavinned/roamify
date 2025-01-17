import { addHotel, addCity } from "../store/reducers/draftItinerarySlice";
import { Hotel, resetHotel } from "../store/reducers/hotelSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import AddToItineraryBtn from "./AddToItineraryBtn";

export default function HotelsList() {
    const { hotels } = useAppSelector((state) => state.hotel);
    const { isAuth } = useAppSelector((state) => state.auth);
    const { name, image } = useAppSelector((state) => state.city);
    const dispatch = useAppDispatch();

    function handleClick(
        event: React.MouseEvent<HTMLButtonElement>,
        hotel: Hotel
    ) {
        event.preventDefault();
        dispatch(addHotel(hotel));
        dispatch(addCity({ cityName: name, cityImage: image }));
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center gap-2.5">
            <button
                onClick={() => dispatch(resetHotel())}
                className="hotel-reset-btn"
            >
                Reset
            </button>
            {hotels.map((hotel) => (
                <div
                    key={hotel.name}
                    className="hotel-item px-3 py-5 flex flex-col gap-[0.5rem] items-center justify-center"
                >
                    <div>
                        <img
                            className="self-center"
                            src={hotel.image}
                            alt={hotel.name}
                            width={250}
                        />
                    </div>
                    <span className="w-[250px]">
                        <p>{hotel.name}</p>
                        <p>
                            {hotel.stars}
                            <span
                                style={{
                                    WebkitTextStroke: "1px rgba(0,0,0,0.45)",
                                }}
                                className="text-yellow-300 text-xl ml-1"
                            >
                                ★
                            </span>
                        </p>
                        <p>{hotel.distance}</p>
                        <p>{hotel.distanceFromPoi}</p>
                        <p>{hotel.pricePerNight}</p>
                        <p>{hotel.cheapestPartner}</p>
                    </span>
                    {isAuth && (
                        <AddToItineraryBtn
                            onClick={(event) => handleClick(event, hotel)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
