import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { searchThunk } from "../store/thunks/searchThunk";

export default function Search() {
    const GEONAMES_UN = import.meta.env.VITE_GEONAMES_UN;
    console.log(GEONAMES_UN);

    const [query, setQuery] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (query.length > 0)
            dispatch(searchThunk({ query: query, username: GEONAMES_UN }));
    }, [GEONAMES_UN, dispatch, query]);

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <label htmlFor="search-query">Search</label>
            <input
                className="border-2 border-black p-3 rounded-lg m-3"
                type="search"
                name="query"
                id="search-query"
                value={query}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(event.target.value)
                }
            />
        </div>
    );
}
