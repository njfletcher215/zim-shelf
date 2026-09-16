import { ShuffleIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button.tsx";
import { resolveRandomPagePath } from "@/lib/utils.ts";

function RandomButton({ zimname }: { zimname: string }) {
    async function handleClick() {
        const path = await resolveRandomPagePath(zimname);
        window.location.href = `${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/raw/${zimname}/content/${path}`;
    }

    return (
        <Button type="button" aria-label="Random page" onClick={handleClick}>
            <ShuffleIcon />
        </Button>
    )
}

export default RandomButton;
