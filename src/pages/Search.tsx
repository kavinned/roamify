import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { searchThunk } from "../store/thunks/searchThunk";

export default function Search() {
    const [query, setQuery] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (query.length > 0) dispatch(searchThunk(query));
    }, [dispatch, query]);

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
