import ZimEntriesFilterProvider from '@/context/ZimEntriesFilterProvider.tsx';
import ZimEntriesLayoutProvider from '@/context/ZimEntriesLayoutProvider.tsx';
import ZimEntriesProvider from '@/context/ZimEntriesProvider.tsx';
import Body from '@/components/Home/Body.tsx';
import Header from '@/components/Home/Header.tsx';

function Home() {
    return (
        <ZimEntriesProvider>
            <ZimEntriesLayoutProvider>
                <ZimEntriesFilterProvider>
                    <Header />
                    <Body />
                </ZimEntriesFilterProvider>
            </ZimEntriesLayoutProvider>
        </ZimEntriesProvider>
    )
}

export default Home;
