import { type ZimEntry } from "@/context/ZimEntriesContext.ts";
import { type ZimEntriesLayout } from "@/context/ZimEntriesLayoutContext.ts";
import { Card } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

function ZimEntryCard({ layout, entry }: { layout: ZimEntriesLayout, entry: ZimEntry }) {
    /* TODO remove the VITE_KIWIX_SERVE_BASE_URL from the <a> href after viewer page is implemented */
    return (
        <a
            href={`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}${entry.rawURL}`}
            className={cn(
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
                    <img src={`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}${entry.thumbnailURL}`} />
                    <h1 className="text-lg text-foreground truncate">{entry.title}</h1>
                </div>
                <div className={cn(
                    "flex-1",
                    "min-w-0",
                    (layout === 'row') && "flex items-center"
                )}>
                    <p className={cn(
                        "text-sm text-muted-foreground",
                        (layout === 'card') ? "line-clamp-6" : "line-clamp-3"
                    )}>{entry.summary}</p>
                </div>
                <div className={cn(
                    "flex justify-between",
                    "text-xs text-muted-foreground",
                    "min-w-0",
                    (layout === 'row') && "flex-col shrink-0",
                    (layout === 'row') && "h-full text-right"
                )}>
                    <span className="truncate">{entry.language}</span>
                    <span className="truncate">{entry.tags.filter((tag) => tag[0] != "_").join(" | ")}</span>
                </div>
            </Card>
        </a>
    )
}

export default ZimEntryCard;
