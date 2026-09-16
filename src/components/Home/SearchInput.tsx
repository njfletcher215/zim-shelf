import { useEffect, useRef, useState } from "react";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

import { useZimEntries } from "@/context/ZimEntriesContext.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

const SEARCH_DEBOUNCE_MS = 300;

function SearchInput() {
    const { fetchZimEntries, clearSearch } = useZimEntries();
    const [ searchQuery, setSearchQuery ] = useState<string>('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // debounced search-as-you-type: kiwix-serve's q param already does partial/prefix
    // matching (Filter::query's `partial` argument defaults to true in libkiwix), so
    // this doesn't need any client-side matching, just fewer requests than every keypress
    useEffect(() => {
        clearTimeout(debounceRef.current);
        if (searchQuery === '') {
            clearSearch();
            return;
        }
        debounceRef.current = setTimeout(() => fetchZimEntries({ q: searchQuery }), SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(debounceRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    return (
        <form className="flex items-center" onSubmit={(e) => {
                e.preventDefault();
                clearTimeout(debounceRef.current);
                fetchZimEntries({q: searchQuery})
            }}>
            <Button type="submit">
                <MagnifyingGlassIcon />
            </Button>
            <div className="relative">
                <Input
                    className="w-64 pr-6"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery !== '' && (
                    <button
                        type="button"
                        aria-label="Clear search"
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                            clearTimeout(debounceRef.current);
                            setSearchQuery('');
                            clearSearch();
                        }}
                    >
                        <XIcon />
                    </button>
                )}
            </div>
        </form>
    )
}

export default SearchInput;
