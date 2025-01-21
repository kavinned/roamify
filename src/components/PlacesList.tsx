import { addPoi, addCity } from "../store/reducers/draftItinerarySlice";
import { Places } from "../store/reducers/poiSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import AddToItineraryBtn from "./AddToItineraryBtn";
import Carousel from "./Carousel";

export default function PlacesList() {
    const { places, status } = useAppSelector((state) => state.poi);
    const { name, image } = useAppSelector((state) => state.city);
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    function handleClick(
        event: React.MouseEvent<HTMLButtonElement>,
        place: Places
    ) {
        event.preventDefault();
        dispatch(addPoi(place));
        dispatch(addCity({ cityName: name, cityImage: image }));
    }

    return (
        <div className="flex flex-1 flex-col gap-2 p-4 overflow-x-hidden">
            {status === "loading" && "Loading"}
            <span className="px-3">
                <h2 className="text-3xl font-bold">Places</h2>
            </span>
            <Carousel>
                {places.map((place) => (
                    <div key={place.address} className="card">
                        <span className="flex-grow">
                            <h3 className="card-header">{place.name}</h3>
                            <p className="card-text">{place.address}</p>
                            <p className="card-text">{place.phone}</p>
                            <a
                                href={place.site}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Website
                            </a>
                        </span>
                        <ul className="flex gap-2 mt-2">
                            {place.types.map((type) => (
                                <li
                                    key={type}
                                    className="bg-muted px-2 py-1 rounded-md text-sm"
                                >
                                    {type}
                                </li>
                            ))}
                        </ul>
                        {isAuth && (
                            <AddToItineraryBtn
                                onClick={(event) => handleClick(event, place)}
                            />
                        )}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
