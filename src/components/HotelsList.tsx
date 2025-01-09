import { useAppSelector } from "../store/store";

export default function HotelsList() {
    const { hotels } = useAppSelector((state) => state.hotel);
    return (
        <div className="flex-1 flex flex-col justify-center gap-2.5">
            {hotels.map((hotel) => (
                <div
                    key={hotel.name}
                    className="hotel-item px-3 py-5 flex flex-col gap-[0.5rem]"
                >
                    <div>
                        <img src={hotel.image} alt={hotel.name} width={250} />
                    </div>
                    <p>{hotel.name}</p>
                    <p>
                        {hotel.stars}
                        <span
                            style={{ WebkitTextStroke: "1px rgba(0,0,0,0.45)" }}
                            className="text-yellow-300 text-xl ml-1"
                        >
                            ★
                        </span>
                    </p>
                    <p>{hotel.distance}</p>
                    <p>{hotel.distanceFromPoi}</p>
                    <p>{hotel.pricePerNight}</p>
                    <p>{hotel.cheapestPartner}</p>
                </div>
            ))}
        </div>
    );
}
