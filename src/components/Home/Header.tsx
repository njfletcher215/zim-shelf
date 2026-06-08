import CategoryDropdown from "@/components/Home/CategoryDropdown.tsx";
import LanguageDropdown from "@/components/Home/LanguageDropdown.tsx";
import SearchInput from "@/components/Home/SearchInput.tsx";
import ViewToggleButton from "@/components/Home/ViewToggleButton.tsx";
import { cn } from "@/lib/utils.ts"

function Header() {
    return (
        <div className={cn(
            "home-header",
            "w-full h-[10%] max-h-[50px]",
            "flex gap-2",
            "px-2 py-2",
            "sticky top-0"
        )}>
            <SearchInput />
            <LanguageDropdown />
            <CategoryDropdown />
            <div className="flex-1" />
            <ViewToggleButton />
        </div>
    )
}

export default Header;
