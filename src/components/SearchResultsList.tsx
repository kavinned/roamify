import { Results } from "../store/reducers/searchSlice";
import { useAppSelector } from "../store/store";
import Loader from "./Loader";

export default function SearchResultsList() {
    const { results, status } = useAppSelector((state) => state.search);

    return (
        <>
            {status === "loading" && <Loader />}
            {results.length > 0 && (
                <ul className="p-5 md:w-1/3 w-2/3 text-center border-2 border-black ">
                    {results.map((result: Results) => (
                        <li
                            className="p-2 border border-black m-2 rounded-lg cursor-pointer hover:bg-slate-300"
                            key={`${result.name}${result.lat}`}
                        >
                            {result.name}
                        </li>
                    ))}
                </ul>
            )}
            {results.length === 0 && status === "succeeded" && (
                <p className="text-lg">No Results Found</p>
            )}
        </>
    );
}
