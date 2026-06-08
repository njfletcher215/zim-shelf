import { useState } from 'react';
import { type ZimEntriesLayout, ZimEntriesLayoutContext } from '@/context/ZimEntriesLayoutContext.ts';

function ZimEntriesLayoutProvider({ children }: { children: React.ReactNode }) {
    const [zimEntriesLayout, setZimEntriesLayout] = useState<ZimEntriesLayout>(
        (localStorage.getItem('zimEntriesLayout') as ZimEntriesLayout) ?? 'card'
    );
    const [isLoading] = useState(true);

    function updateZimEntriesLayout(newZimEntriesLayout: ZimEntriesLayout) {
        setZimEntriesLayout(newZimEntriesLayout);
        localStorage.setItem('zimEntriesLayout', newZimEntriesLayout);
    }

    function toggleZimEntriesLayout() {
        const newZimEntriesLayout: ZimEntriesLayout = (zimEntriesLayout === 'card') ? 'row' : 'card';
        updateZimEntriesLayout(newZimEntriesLayout);
    }

    return (
        <ZimEntriesLayoutContext.Provider value={{
            zimEntriesLayout,
            updateZimEntriesLayout,
            toggleZimEntriesLayout,
            isLoading
        }}>
            {children}
        </ZimEntriesLayoutContext.Provider>
    )
}

export default ZimEntriesLayoutProvider;
