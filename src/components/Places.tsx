import { useAppSelector } from "../store/store";

export default function Places() {
    const { places, status } = useAppSelector((state) => state.poi);

    return (
        <div>
            {status === "loading" && "Loading"}
            {places.map((place) => (
                <div
                    className="px-3 py-5 flex flex-col gap-[0.5rem]"
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
                </div>
            ))}
        </div>
    );
}
