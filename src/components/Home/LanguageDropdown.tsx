import { useCallback, useEffect, useState } from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { useZimEntriesFilter } from "@/context/ZimEntriesFilterContext.ts";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu.tsx";
import { fetchXml } from "@/lib/utils.ts";

function LanguageDropdown() {
    type AvailableZimEntriesLanguage = {
        title: string,
        code: string,
        count: number
    }

    const {
        zimEntriesFilterLanguages,
        updateZimEntriesFilterLanguages,
        addZimEntriesFilterLanguage,
        removeZimEntriesFilterLanguage
    } = useZimEntriesFilter();
    const [
        availableZimEntriesLanguages,
        setAvailableZimEntriesLanguages
    ] = useState<AvailableZimEntriesLanguage[]>([]);

    const fetchAvailableZimEntriesLanguages = useCallback(() => {
        fetchXml(`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/catalog/v2/languages`)
            .then((xml) => {
                const entries: Element[] = Array.from(xml.querySelectorAll("entry"));
                setAvailableZimEntriesLanguages(
                    entries.map((el: Element) => ({
                        title: el.querySelector("title")?.textContent ?? '',
                        code: el.querySelector("*|language")?.textContent ?? '',
                        count: parseInt(el.querySelector("*|count")?.textContent ?? '0', 10)
                    }))
                );
            });
    }, [setAvailableZimEntriesLanguages]);

    useEffect(() => {
        fetchAvailableZimEntriesLanguages();
    }, [fetchAvailableZimEntriesLanguages]);

    return (
        <>
            <DropdownMenu>
                <div className="flex w-48">
                    <DropdownMenuTrigger className="flex-1 overflow-hidden">
                        <Button className="w-full">
                            <span className="truncate">
                                {"Languages: "}
                                {(zimEntriesFilterLanguages.length > 0) ?
                                    zimEntriesFilterLanguages.join(", ") : "all"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    {zimEntriesFilterLanguages.length > 0 &&
                        <Button onClick={() => updateZimEntriesFilterLanguages([])}>
                            <ArrowCounterClockwiseIcon />
                        </Button>
                    }
                </div>
                <DropdownMenuContent className="w-48">
                    {availableZimEntriesLanguages.map((language: AvailableZimEntriesLanguage) => (
                        <DropdownMenuCheckboxItem
                            key={language.code}
                            className="flex items-center"
                            checked={zimEntriesFilterLanguages.includes(language.code)}
                            onSelect={(event: Event) => event.preventDefault()}
                            onCheckedChange={(checked: boolean) => {
                                if (checked) addZimEntriesFilterLanguage(language.code);
                                else removeZimEntriesFilterLanguage(language.code);
                            }}
                        >
                            {language.title}
                            <div className="flex-1" />
                            <Badge variant="secondary">{language.count}</Badge>
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default LanguageDropdown;
