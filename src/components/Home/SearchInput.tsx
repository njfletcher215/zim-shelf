import { useState } from "react";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

import { useZimEntries } from "@/context/ZimEntriesContext.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

function SearchInput() {
    const { fetchZimEntries, clearSearch } = useZimEntries();
    const [ searchQuery, setSearchQuery ] = useState<string>('');

    return (
        <form className="flex items-center" onSubmit={(e) => {
                e.preventDefault();
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
