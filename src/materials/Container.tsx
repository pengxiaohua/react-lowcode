import { ICommonComponentProps } from "./interface";
import useMaterialsDrop from "../hooks/useMaterialsDrop";

const Container = ({ id, children }: ICommonComponentProps) => {
    const { canDrop, drop } = useMaterialsDrop(['Button', 'Container'], id);

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
