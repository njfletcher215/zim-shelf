import { createContext, useContext } from 'react';

type ZimEntriesFilterMatchMode = 'any' | 'all';

type ZimEntriesFilter = {
    categories: string[],
    languages: string[],
    languageMatchMode: ZimEntriesFilterMatchMode,
    searchQuery: string
}

interface ZimEntriesFilterContextType {
    zimEntriesFilterCategories: string[],
    updateZimEntriesFilterCategories:
        (newZimEntriesFilterCategories: string[]) => void,
    addZimEntriesFilterCategory: (toAdd: string) => void,
    removeZimEntriesFilterCategory: (toRemove: string) => void,
    zimEntriesFilterLanguages: string[],
    updateZimEntriesFilterLanguages:
        (newZimEntriesFilterLanguages: string[]) => void,
    addZimEntriesFilterLanguage: (toAdd: string) => void,
    removeZimEntriesFilterLanguage: (toRemove: string) => void,
    zimEntriesFilterLanguageMatchMode: ZimEntriesFilterMatchMode,
    updateZimEntriesFilterLanguageMatchMode:
        (newZimEntriesFilterLanguageMatchMode: ZimEntriesFilterMatchMode) => void,
    zimEntriesFilterSearchQuery: string,
    updateZimEntriesFilterSearchQuery:
        (newZimEntriesFilterSearchQuery: string) => void
}

const ZimEntriesFilterContext = createContext<ZimEntriesFilterContextType | null>(null);

function useZimEntriesFilter() {
    const ctx = useContext(ZimEntriesFilterContext);
    if (!ctx) throw new Error('useZimEntriesFilter must be used within a ZimEntriesFilterProvider');
    return ctx;
}

export {
    type ZimEntriesFilter,
    type ZimEntriesFilterMatchMode,
    ZimEntriesFilterContext,
    useZimEntriesFilter
};
