import { useState } from 'react';
import { type ZimEntriesFilter, type ZimEntriesFilterMatchMode, ZimEntriesFilterContext } from "@/context/ZimEntriesFilterContext.ts";

function ZimEntriesFilterProvider({ children }: { children: React.ReactNode }) {
    const [zimEntriesFilter, setZimEntriesFilter] = useState<ZimEntriesFilter>({
        categories: [],
        languages: [],
        languageMatchMode: 'any',
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

    function updateZimEntriesFilterLanguageMatchMode(newZimEntriesFilterLanguageMatchMode: ZimEntriesFilterMatchMode) {
        setZimEntriesFilter((prev) => ({
            ...prev,
            languageMatchMode: newZimEntriesFilterLanguageMatchMode
        }));
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
            zimEntriesFilterLanguageMatchMode: zimEntriesFilter.languageMatchMode,
            updateZimEntriesFilterLanguageMatchMode,
            zimEntriesFilterSearchQuery: zimEntriesFilter.searchQuery,
            updateZimEntriesFilterSearchQuery
        }}>
            {children}
        </ZimEntriesFilterContext.Provider>
    )
}

export default ZimEntriesFilterProvider;
