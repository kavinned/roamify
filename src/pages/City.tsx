import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { cityPlacesThunks, cityThunk } from "../store/thunks/cityThunk";
import Loader from "../components/Loader";
import PlacesList from "../components/PlacesList";
import HotelSearch from "../components/HotelSearch";
import HotelsList from "../components/HotelsList";
import DraftItineraryBtn from "../components/DraftItineraryBtn";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useCollapseText from "../hooks/useCollapseText";
import { Button } from "../components/ui/button";

export default function City() {
    const [searchParams] = useSearchParams();
    const { status, name, description, image, latlng } = useAppSelector(
        (state) => state.city
    );
    const { status: hotelStatus, hotels } = useAppSelector(
        (state) => state.hotel
    );
    const dispatch = useAppDispatch();
    const cityName = searchParams.get("name");
    const [lat, lng] = latlng
        ? latlng.replace(" ", "").split(",")
        : [null, null];

    useDocumentTitle(cityName as string);
    const { isExpanded, toggleText, textRef, showButton } = useCollapseText();

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
        <div className="relative">
            {status === "loading" ? (
                <Loader />
            ) : (
                <>
                    <div className="h-fit flex md:flex-row flex-col-reverse items-center md:items-start md:justify-center mt-5">
                        <span className="p-3">
                            <h2 className="md:mt-12 w-full">{name}</h2>
                            <div className="text-toggle">
                                <p
                                    ref={textRef}
                                    className={
                                        isExpanded ? `expanded` : `collapsed`
                                    }
                                >
                                    {description}
                                </p>
                                {showButton && (
                                    <Button
                                        variant="default"
                                        className="w-fit h-fit p-2 text-xs my-2"
                                        onClick={toggleText}
                                    >
                                        {isExpanded ? "Show Less" : "Show More"}
                                    </Button>
                                )}
                            </div>
                        </span>
                        <img
                            src={image as string}
                            alt={name as string}
                            className="aspect-auto md:size-64 size-auto md:object-fit object-cover rounded-3xl mt-12 p-3"
                        />
                    </div>
                    <div className="flex w-full flex-col">
                        <PlacesList />
                        {hotelStatus === "succeeded" && hotels.length > 0 ? (
                            <HotelsList />
                        ) : (
                            <HotelSearch />
                        )}
                    </div>
                </>
            )}
            <DraftItineraryBtn />
        </div>
    );
}
