import { useRef } from "react";
import { addPoi, addCity } from "../store/reducers/draftItinerarySlice";
import { Places } from "../store/reducers/poiSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import AddToItineraryBtn from "./AddToItineraryBtn";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlacesList() {
    const { places, status } = useAppSelector((state) => state.poi);
    const { name, image } = useAppSelector((state) => state.city);
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "auto",
        });
    };

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
            <div className="relative group">
                <Button
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-30 group-hover:opacity-70 transition-opacity"
                    onClick={() => scroll("left")}
                    size="icon"
                    variant="outline"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-scroll w-full scroll-smooth gap-4"
                    style={{ scrollbarWidth: "none" }}
                >
                    {places.map((place) => (
                        <div
                            key={place.address}
                            className="bg-card-foreground/5 border-muted-foreground/20 border rounded-lg shadow-sm shadow-primary/30 drop-shadow-md p-6 flex flex-col gap-2 md:w-[calc(33.33%-0.7rem)] xl:w-[calc(20%-0.8rem)] flex-shrink-0"
                        >
                            <span className="flex-grow">
                                <h3 className="font-semibold text-lg">
                                    {place.name}
                                </h3>
                                <p className="dark:text-muted-foreground/50 text-primary/70">
                                    {place.address}
                                </p>
                                <p className="dark:text-muted-foreground/50 text-primary/70">
                                    {place.phone}
                                </p>
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
                            {!isAuth && (
                                <AddToItineraryBtn
                                    onClick={(event) =>
                                        handleClick(event, place)
                                    }
                                />
                            )}
                        </div>
                    ))}
                    <Button
                        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-30 group-hover:opacity-70 transition-opacity"
                        onClick={() => scroll("right")}
                        size="icon"
                        variant="outline"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
