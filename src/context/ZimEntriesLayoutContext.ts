import { createContext, useContext } from 'react';

type ZimEntriesLayout = 'card' | 'row';

interface ZimEntriesLayoutContextType {
    zimEntriesLayout: ZimEntriesLayout,
    updateZimEntriesLayout: (newZimEntriesLayout: ZimEntriesLayout) => void,
    toggleZimEntriesLayout: () => void,
    isLoading: boolean
}

const ZimEntriesLayoutContext = createContext<ZimEntriesLayoutContextType | null>(null);

function useZimEntriesLayout() {
    const ctx = useContext(ZimEntriesLayoutContext);
    if (!ctx) throw new Error('useZimEntriesLayout must be used within a ZimEntriesLayoutProvider');
    return ctx;
}

export {
    type ZimEntriesLayout,
    ZimEntriesLayoutContext,
    useZimEntriesLayout
};
