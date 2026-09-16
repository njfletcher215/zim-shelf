import { type ZimEntry } from "@/context/ZimEntriesContext.ts";
import { type ZimEntriesLayout } from "@/context/ZimEntriesLayoutContext.ts";
import { Card } from "@/components/ui/card.tsx";
import RandomButton from "@/components/Home/RandomButton.tsx";
import ZimEntrySearchInput from "@/components/Home/ZimEntrySearchInput.tsx";
import { cn, resolveMainPagePath } from "@/lib/utils.ts";

function ZimEntryCard({ layout, entry }: { layout: ZimEntriesLayout, entry: ZimEntry }) {
    /* TODO remove the VITE_KIWIX_SERVE_BASE_URL from the <a> href after viewer page is implemented */
    const [, , zimname, , ...pathParts] = entry.rawURL.split('/'); // ['', 'raw', '<zimname>', 'content', ...'<path?>']
    const needsMainPageResolution = pathParts.join('/') === '';

    async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
        if (!needsMainPageResolution || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const path = await resolveMainPagePath(zimname);
        window.location.href = `${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/raw/${zimname}/content/${path}`;
    }

    // each clickable region below gets its own <a> with these same props, rather than one
    // anchor wrapping the whole card, since real interactive controls (search form, random
    // button) can't validly nest inside an <a>, and now live in-flow alongside this content
    // rather than overlaid on top of it
    const mainPageLinkProps = {
        href: `${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}${entry.rawURL}`,
        onClick: handleClick
    };

    const controls = (
        <div className="flex items-center gap-1 shrink-0">
            <ZimEntrySearchInput zimname={zimname} />
            <RandomButton zimname={zimname} />
        </div>
    );

    return (
        <div className={cn(
            (layout === 'card') ? "w-64 h-64" : "w-full h-16"
        )}>
            <Card className={cn(
                "w-full h-full",
                (layout === 'card') ? "p-4" : "p-2",
                (layout === 'card') ? "flex-col" : "flex-row"
            )}>
                <div className={cn(
                    "flex items-center gap-2",
                    "min-w-0",
                    (layout === 'row') && "w-[30%]"
                )}>
                    <a {...mainPageLinkProps} className="flex items-center gap-2 min-w-0 flex-1">
                        <img src={`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}${entry.thumbnailURL}`} />
                        <h1 className="text-lg text-foreground truncate">{entry.title}</h1>
                    </a>
                    {(layout === 'card') && controls}
                </div>
                <a {...mainPageLinkProps} className={cn(
                    "flex-1",
                    "min-w-0",
                    (layout === 'row') ? "flex items-center" : "block"
                )}>
                    <p className={cn(
                        "text-sm text-muted-foreground",
                        (layout === 'card') ? "line-clamp-6" : "line-clamp-3"
                    )}>{entry.summary}</p>
                </a>
                <a {...mainPageLinkProps} className={cn(
                    "flex justify-between",
                    "text-xs text-muted-foreground",
                    "min-w-0",
                    (layout === 'row') && "flex-col shrink-0",
                    (layout === 'row') && "h-full text-right"
                )}>
                    <span className="truncate">{entry.languages.join(", ")}</span>
                    <span className="truncate">{entry.tags.filter((tag) => tag[0] != "_").join(" | ")}</span>
                </a>
                {(layout === 'row') && controls}
            </Card>
        </div>
    )
}

export default ZimEntryCard;
