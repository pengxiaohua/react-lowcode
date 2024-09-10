import { PropsWithChildren } from "react";

import useMaterialsDrop from "../hooks/useMaterialsDrop";

const Container = ({ children }: PropsWithChildren) => {
    const { canDrop, drop } = useMaterialsDrop(['Button', 'Container'], 0);

    return (
        <div
            ref={drop}
            className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            {children}
        </div>
    )
};

export default Container;