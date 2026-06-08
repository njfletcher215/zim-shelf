import { useCallback, useEffect, useState } from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { useZimEntriesFilter } from "@/context/ZimEntriesFilterContext.ts";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { fetchXml } from "@/lib/utils.ts";

function CategoryDropdown() {
    const {
        zimEntriesFilterCategories,
        updateZimEntriesFilterCategories,
        addZimEntriesFilterCategory,
        removeZimEntriesFilterCategory
    } = useZimEntriesFilter();
    const [
        availableZimEntriesCategories,
        setAvailableZimEntriesCategories
    ] = useState<string[]>([]);

    const fetchAvailableZimEntriesCategories = useCallback(() => {
        fetchXml(`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/catalog/v2/categories`)
            .then((xml) =>
                setAvailableZimEntriesCategories(
                    Array.from(xml.querySelectorAll("entry title"))
                        .map((el: Element) => el.textContent ?? ''))
            );
    }, [setAvailableZimEntriesCategories]);

    useEffect(() => {
        fetchAvailableZimEntriesCategories();
    }, [fetchAvailableZimEntriesCategories]);

    return (
        <DropdownMenu>
            <div className="flex w-48">
                <DropdownMenuTrigger className="flex-1 overflow-hidden">
                    <Button className="w-full">
                        <span className="truncate">
                            {"Categories: "}
                            {(zimEntriesFilterCategories.length > 0) ?
                                zimEntriesFilterCategories.join(", ") : "all"}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                {zimEntriesFilterCategories.length > 0 &&
                    <Button onClick={() => updateZimEntriesFilterCategories([])}>
                        <ArrowCounterClockwiseIcon />
                    </Button>
                }
            </div>
            <DropdownMenuContent className="w-48">
                {availableZimEntriesCategories.map((category: string) => (
                    <DropdownMenuCheckboxItem
                        key={category}
                        checked={zimEntriesFilterCategories.includes(category)}
                        onSelect={(event: Event) => event.preventDefault()}
                        onCheckedChange={(checked: boolean) => {
                            if (checked) addZimEntriesFilterCategory(category);
                            else removeZimEntriesFilterCategory(category);
                        }}
                    >
                        {category}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoryDropdown;
