import { PropsWithChildren } from "react";
import { message } from "antd";
import { useDrop } from 'react-dnd'

function Page({ children }: PropsWithChildren) {

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: ['Button', 'Container'],
        drop: (item: { type: string }) => {
            message.success(item.type)
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div
            ref={drop}
            className='p-[20px] h-[100%] box-border'
            style={{ border: canDrop ? '2px solid blue' : 'none' }}
        >
            {children}
        </div>
    )
}

export default Page;
