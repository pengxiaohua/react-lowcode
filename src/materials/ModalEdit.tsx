import { ICommonComponentProps } from "./interface";
import useMaterialsDrop from "../hooks/useMaterialsDrop";

const ModalEdit = ({ id, children, title, styles }: ICommonComponentProps) => {
    const { canDrop, drop } = useMaterialsDrop(['Button', 'Container'], id);

    return (
        <div
            ref={drop}
            style={styles}
            data-component-id={id}
            className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            <h4>{title}</h4>
            <div>{children}</div>
        </div>
    )
}

export default ModalEdit;
