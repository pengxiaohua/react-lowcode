import { ICommonComponentProps } from "./interface";
import useMaterialsDrop from "../hooks/useMaterialsDrop";

function Page({ id, children, styles }: ICommonComponentProps) {
    const { drop, canDrop } = useMaterialsDrop(['Container', 'Button'], id);

    return (
        <div
            data-component-id={id}
            ref={drop}
            style={styles}
            className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            {children}
        </div>
    )
}

export default Page;
