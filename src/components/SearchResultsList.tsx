import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import Loader from "./Loader";

export default function SearchResultsList() {
    const { results, status } = useAppSelector((state) => state.search);
    const navigate = useNavigate();

    const dedupResults = Array.from(
        new Set(results.map((result) => result.name))
    );

    function handleClick(event: React.MouseEvent<HTMLLIElement>) {
        event.preventDefault();
        const cityName = event.currentTarget.textContent;
        navigate(`/city?name=${cityName}`);
        return;
    }

    return (
        <>
            {status === "loading" && <Loader />}
            {results.length > 0 && (
                <ul className="p-5 md:w-1/3 w-2/3 text-center border-2 border-black ">
                    {dedupResults.map((_, i) => (
                        <li
                            onClick={handleClick}
                            className="p-2 border border-black m-2 rounded-lg cursor-pointer hover:bg-slate-300"
                            key={dedupResults[i]}
                        >
                            {dedupResults[i]}
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
