import { useEffect, useState } from "react";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

const AUTO_COLLAPSE_MS = 3000;

function ZimEntrySearchInput({ zimname }: { zimname: string }) {
    const [expanded, setExpanded] = useState(false);
    const [term, setTerm] = useState('');
    const [focused, setFocused] = useState(false);

    function expand() {
        setTerm('');
        setExpanded(true);
    }

    function collapse() {
        setTerm('');
        setFocused(false);
        setExpanded(false);
    }

    // auto-collapse a few seconds after the input becomes both empty and unfocused
    useEffect(() => {
        if (term !== '' || focused) return;
        const timeout = setTimeout(collapse, AUTO_COLLAPSE_MS);
        return () => clearTimeout(timeout);
    }, [term, focused]);

    return (
        <form
            className="flex items-center gap-1"
            action={`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/search`}
            method="get"
            // deferred: collapsing synchronously here would unmount the pattern input
            // before the browser reads the form's fields to build the GET navigation,
            // submitting an empty search every time (same root cause as the type-flip bug)
            onSubmit={() => setTimeout(collapse, 0)}
        >
            <input type="hidden" name="books.name" value={zimname} />
            {expanded ? (
                <>
                    <Button type="submit">
                        <MagnifyingGlassIcon />
                    </Button>
                    <div className="relative">
                        <Input
                            className="w-32 pr-6"
                            type="text"
                            name="pattern"
                            placeholder="Search"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            autoFocus
                        />
                        {term !== '' && (
                            <button
                                type="button"
                                aria-label="Clear search"
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setTerm('')}
                            >
                                <XIcon />
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <Button type="button" onClick={expand}>
                    <MagnifyingGlassIcon />
                </Button>
            )}
        </form>
    )
}

export default ZimEntrySearchInput;
