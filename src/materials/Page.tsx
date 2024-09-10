import { PropsWithChildren } from "react";

import useMaterialsDrop from "../hooks/useMaterialsDrop";

interface ICommonComponentProps extends PropsWithChildren {
    id: number;
    name: string;
    [key: string]: any;
}

function Page({ id, name, children }: ICommonComponentProps) {
    const { drop, canDrop } = useMaterialsDrop(['Container', 'Button'], id);

    return (
        <div
            ref={drop}
            className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            {children}
        </div>
    )
}

export default Page;
