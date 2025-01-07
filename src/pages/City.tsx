import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { cityThunk } from "../store/thunks/cityThunk";
import Loader from "../components/Loader";

export default function City() {
    const [searchParams] = useSearchParams();
    const { status, name, description, image } = useAppSelector(
        (state) => state.city
    );
    const dispatch = useAppDispatch();

    const cityName = searchParams.get("name");

    useEffect(() => {
        if (cityName) dispatch(cityThunk(cityName));
    }, [cityName, dispatch]);

    return (
        <>
            {status === "loading" && <Loader />}
            <div className="h-full w-screen flex md:flex-row flex-col-reverse items-center md:items-start md:justify-center">
                <span className="p-3">
                    <h2 className="md:mt-12 w-full">{name}</h2>
                    <h2>{description?.slice(0, 100)}</h2>
                </span>
                <img
                    src={image as string}
                    alt={name as string}
                    className="aspect-auto size-72 object-fit rounded-3xl mt-12 p-3"
                />
            </div>
        </>
    );
}
