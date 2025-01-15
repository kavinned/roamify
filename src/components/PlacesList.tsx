import { addPoi, addCity } from "../store/reducers/draftItinerarySlice";
import { Places } from "../store/reducers/poiSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import AddToItineraryBtn from "./AddToItineraryBtn";

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
        <div className="flex flex-1 flex-col gap-2">
            {status === "loading" && "Loading"}
            {places.map((place) => (
                <div
                    className="px-3 py-5 flex flex-col gap-[0.5rem] "
                    key={place.address}
                >
                    <p>{place.name}</p>
                    <p>{place.address}</p>
                    <p>{place.phone}</p>
                    <p>{place.site}</p>
                    <ul className="flex gap-2 border border-gray-600 w-fit px-2 py-1">
                        {place.types.map((type) => (
                            <li key={type}>{type}</li>
                        ))}
                    </ul>
                    {isAuth && (
                        <AddToItineraryBtn
                            onClick={(event) => handleClick(event, place)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
