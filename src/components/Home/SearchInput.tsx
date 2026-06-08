import { useState } from "react";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { useZimEntries } from "@/context/ZimEntriesContext.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

function SearchInput() {
    const { fetchZimEntries } = useZimEntries();
    const [ searchQuery, setSearchQuery ] = useState<string>('');

    return (
        <form className="flex items-center" onSubmit={(e) => {
                e.preventDefault();
                fetchZimEntries({q: searchQuery})
            }}>
            <Button type="submit">
                <MagnifyingGlassIcon />
            </Button>
            <Input
                className="w-64"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    )
}

export default SearchInput;
