import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { searchThunk } from "../store/thunks/searchThunk";
import { debounce } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const dispatch = useAppDispatch();

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            dispatch(searchThunk(query));
            setSearchParams({ query });
        }, 500),
        [dispatch]
    );

    useEffect(() => {
        if (query.length > 0) debouncedSearch(query);
    }, [debouncedSearch, dispatch, query]);

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
