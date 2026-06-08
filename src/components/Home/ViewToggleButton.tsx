import { SquaresFourIcon, RowsIcon } from "@phosphor-icons/react";

import { useZimEntriesLayout } from "@/context/ZimEntriesLayoutContext.ts";
import { Button } from "@/components/ui/button.tsx";

function ViewToggleButton() {
    const { zimEntriesLayout, toggleZimEntriesLayout, isLoading } = useZimEntriesLayout();

    return (
        <Button onClick={toggleZimEntriesLayout}>
            {(isLoading || zimEntriesLayout === 'card') ?
                <SquaresFourIcon /> : <RowsIcon />}
        </Button>
    )
}

export default ViewToggleButton;
