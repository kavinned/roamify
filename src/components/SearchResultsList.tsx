import { useNavigate } from "react-router-dom";
import { Results } from "../store/reducers/searchSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { cityThunk } from "../store/thunks/cityThunk";
import Loader from "./Loader";

export default function SearchResultsList() {
    const { results, status } = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleClick(event: React.MouseEvent<HTMLLIElement>) {
        event.preventDefault();
        const cityName = event.currentTarget.textContent;
        if (cityName) dispatch(cityThunk(cityName));
        navigate(`/city?name=${cityName}`);
        return;
    }

    return (
        <>
            {status === "loading" && <Loader />}
            {results.length > 0 && (
                <ul className="p-5 md:w-1/3 w-2/3 text-center border-2 border-black ">
                    {results.map((result: Results) => (
                        <li
                            onClick={handleClick}
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
