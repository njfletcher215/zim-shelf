import { useEffect } from "react";
import { useZimEntries } from "@/context/ZimEntriesContext.ts";
import { useZimEntriesFilter } from "@/context/ZimEntriesFilterContext.ts";
import { useZimEntriesLayout } from "@/context/ZimEntriesLayoutContext.ts";
import ZimEntryCard from "@/components/Home/ZimEntryCard.tsx";

function ZimEntryCards() {
    const { zimEntries, fetchZimEntries } = useZimEntries();
    const {
        zimEntriesFilterLanguages,
        zimEntriesFilterLanguageMatchMode,
        zimEntriesFilterCategories
    } = useZimEntriesFilter();
    const { zimEntriesLayout } = useZimEntriesLayout();

    useEffect(() => {
        fetchZimEntries();
    }, []);  // ignore linter, this should only be run on intial page load,
             // which means it should NOT be dependant on fetchZimEntries

    return (
        <div className="flex flex-wrap justify-center gap-2">
            {zimEntries
                .filter((zimEntry) => zimEntriesFilterLanguages.length == 0 ||
                        (zimEntriesFilterLanguageMatchMode === 'all'
                            ? zimEntriesFilterLanguages.every((language) => zimEntry.languages.includes(language))
                            : zimEntriesFilterLanguages.some((language) => zimEntry.languages.includes(language))))
                .filter((zimEntry) => zimEntriesFilterCategories.length == 0 ||
                        zimEntriesFilterCategories.includes(zimEntry.category))
                .map((zimEntry) =>
                     <ZimEntryCard
                        key={zimEntry.id}
                        layout={zimEntriesLayout}
                        entry={zimEntry}
                     />
                )
            }
        </div>
    )
}

export default ZimEntryCards;
