import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../store/store";
import { searchThunk } from "../store/thunks/searchThunk";
import { debounce } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import SearchResultsList from "../components/SearchResultsList";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const dispatch = useAppDispatch();

    useDocumentTitle(query ? query : "Search");

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                dispatch(searchThunk(query));
                setSearchParams({ query });
            }, 500),
        [dispatch, setSearchParams]
    );

    useEffect(() => {
        if (query.length > 0) debouncedSearch(query);
    }, [debouncedSearch, dispatch, query]);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
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
            <SearchResultsList />
        </div>
    );
}
