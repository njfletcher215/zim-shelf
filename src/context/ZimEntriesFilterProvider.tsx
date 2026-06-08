import { useState } from 'react';
import { type ZimEntriesFilter, ZimEntriesFilterContext } from "@/context/ZimEntriesFilterContext.ts";

function ZimEntriesFilterProvider({ children }: { children: React.ReactNode }) {
    const [zimEntriesFilter, setZimEntriesFilter] = useState<ZimEntriesFilter>({
        categories: [],
        languages: [],
        searchQuery: '',
    });

    function updateZimEntriesFilterCategories(newZimEntriesFilterCategories: string[]) {
        setZimEntriesFilter((prev) => ({
            ...prev,
            categories: newZimEntriesFilterCategories
        }));
    }

    function addZimEntriesFilterCategory(toAdd: string) {
        updateZimEntriesFilterCategories([...zimEntriesFilter.categories, toAdd]);
    }

    function removeZimEntriesFilterCategory(toRemove: string) {
        updateZimEntriesFilterCategories(
            zimEntriesFilter.categories.filter((item) => item !== toRemove));
    }

    function updateZimEntriesFilterLanguages(newZimEntriesFilterLanguages: string[]) {
        setZimEntriesFilter((prev) => ({
            ...prev,
            languages: newZimEntriesFilterLanguages
        }));
    }

    function addZimEntriesFilterLanguage(toAdd: string) {
        updateZimEntriesFilterLanguages([...zimEntriesFilter.languages, toAdd]);
    }

    function removeZimEntriesFilterLanguage(toRemove: string) {
        updateZimEntriesFilterLanguages(
            zimEntriesFilter.languages.filter((item) => item !== toRemove));
    }

    function updateZimEntriesFilterSearchQuery(newZimEntriesFilterSearchQuery: string) {
        setZimEntriesFilter((prev) => ({
            ...prev,
            searchQuery: newZimEntriesFilterSearchQuery
        }));
    }

    return (
        <ZimEntriesFilterContext.Provider value={{
            zimEntriesFilterCategories: zimEntriesFilter.categories,
            updateZimEntriesFilterCategories,
            addZimEntriesFilterCategory,
            removeZimEntriesFilterCategory,
            zimEntriesFilterLanguages: zimEntriesFilter.languages,
            updateZimEntriesFilterLanguages,
            addZimEntriesFilterLanguage,
            removeZimEntriesFilterLanguage,
            zimEntriesFilterSearchQuery: zimEntriesFilter.searchQuery,
            updateZimEntriesFilterSearchQuery
        }}>
            {children}
        </ZimEntriesFilterContext.Provider>
    )
}

export default ZimEntriesFilterProvider;
