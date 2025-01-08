import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { cityPlacesThunks, cityThunk } from "../store/thunks/cityThunk";
import Loader from "../components/Loader";

export default function City() {
    const [searchParams] = useSearchParams();
    const { status, name, description, image, latlng } = useAppSelector(
        (state) => state.city
    );
    const dispatch = useAppDispatch();

    const cityName = searchParams.get("name");

    const [lat, lng] = latlng
        ? latlng.replace(" ", "").split(",")
        : [null, null];

    useEffect(() => {
        if (cityName) {
            Promise.all([
                dispatch(cityThunk(cityName)),
                lat !== null &&
                    lng !== null &&
                    dispatch(cityPlacesThunks({ lat, lng })),
            ]);
        }
    }, [cityName, dispatch, lat, lng]);

    return (
        <>
            {status === "loading" && <Loader />}
            <div className="h-full w-screen flex md:flex-row flex-col-reverse items-center md:items-start md:justify-center">
                <span className="p-3">
                    <h2 className="md:mt-12 w-full">{name}</h2>
                    <h2>{description}</h2>
                </span>
                <img
                    src={image as string}
                    alt={name as string}
                    className="aspect-auto md:size-64 size-auto md:object-fit object-cover rounded-3xl mt-12 p-3"
                />
            </div>
        </>
    );
}
