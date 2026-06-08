import { createContext, useContext } from 'react';

type ZimEntry = {
    id: string,
    title: string,
    summary: string,
    language: string,
    name: string,
    flavour: string,
    category: string,
    tags: string[],
    articleCount: number,
    mediaCount: number,
    thumbnailURL: string,
    rawURL: string,
    author: string,
    publisher: string
}

interface ZimEntriesContextType {
    zimEntries: ZimEntry[],
    fetchZimEntries: (params?: {
        count?: number,
        start?: number,
        lang?: string[],
        category?: string[],
        tag?: string[],
        notag?: string[],
        maxsize?: number,
        q?: string,
        name?: string
    }) => void
}

const ZimEntriesContext = createContext<ZimEntriesContextType | null>(null);

function useZimEntries() {
    const ctx = useContext(ZimEntriesContext);
    if (!ctx) throw new Error('useZimEntries must be used within a ZimEntriesProvider');
    return ctx;
}

export {
    type ZimEntry,
    ZimEntriesContext,
    useZimEntries
};
