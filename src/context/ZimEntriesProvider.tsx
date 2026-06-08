import { useState } from 'react';

import { type ZimEntry, ZimEntriesContext } from "@/context/ZimEntriesContext.ts";
import { fetchXml } from "@/lib/utils.ts";

function ZimEntriesProvider({ children }: { children: React.ReactNode }) {
    const [zimEntries, setZimEntries] = useState<ZimEntry[]>([]);
    function fetchZimEntries(params?: {
        count?: number,
        start?: number,
        lang?: string[],
        category?: string[],
        tag?: string[],
        notag?: string[],
        maxsize?: number,
        q?: string,
        name?: string
    }) {
        let url = `${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/catalog/v2/entries?count=${encodeURIComponent(params?.count ?? -1)}`;
        if (params?.start !== undefined) url += `&start=${encodeURIComponent(params?.start)}`;
        if (params?.lang?.length) url += `&lang=${encodeURIComponent(params?.lang.join(','))}`;
        if (params?.category?.length) url += `&category=${encodeURIComponent(params?.category.join(','))}`;
        if (params?.tag?.length) url += `&tag=${encodeURIComponent(params?.tag.join(';'))}`;
        if (params?.notag?.length) url += `&tag=${encodeURIComponent(params?.notag.join(';'))}`;
        if (params?.maxsize !== undefined) url += `&maxsize=${encodeURIComponent(params?.maxsize)}`;
        if (params?.q) url += `&q=${encodeURIComponent(params?.q)}`;
        if (params?.name) url += `&name=${encodeURIComponent(params?.name)}`;

        fetchXml(url)
            .then((xml) => {
                const entries: Element[] = Array.from(xml.querySelectorAll("entry"));
                setZimEntries(
                    entries.map((el: Element) => ({
                        id: el.querySelector("id")?.textContent ?? '',
                        title: el.querySelector("title")?.textContent ?? '',
                        summary: el.querySelector("summary")?.textContent ?? '',
                        language: el.querySelector("language")?.textContent ?? '',
                        name: el.querySelector("name")?.textContent ?? '',
                        flavour: el.querySelector("flavour")?.textContent ?? '',
                        category: el.querySelector("category")?.textContent ?? '',
                        tags: (el.querySelector("tags")?.textContent ?? '').split(';').filter(t => t !== ''),
                        articleCount: parseInt(el.querySelector("articleCount")?.textContent ?? '0', 10),
                        mediaCount: parseInt(el.querySelector("mediaCount")?.textContent ?? '0', 10),
                        thumbnailURL: el.querySelector("link[rel='http://opds-spec.org/image/thumbnail']")?.getAttribute("href") ?? '',
                        rawURL: (() => {
                            const contentURL = el.querySelector("link[type='text/html']")?.getAttribute("href");
                            if (!contentURL) return '';
                            const parts = contentURL.split('/'); // ['', 'content', '<zimname>', '<path?>']
                            const zimname = parts[2];
                            const path = parts[3] ?? '';
                            return zimname ? `/raw/${zimname}/content/${path || 'index'}` : '';
                        })(),
                        author: el.querySelector("author name")?.textContent ?? '',
                        publisher: el.querySelector("publisher name")?.textContent ?? ''
                    }))
                );
            });
    }

    return (
        <ZimEntriesContext.Provider value={{
            zimEntries,
            fetchZimEntries
        }}>
            {children}
        </ZimEntriesContext.Provider>
    )
}

export default ZimEntriesProvider;
