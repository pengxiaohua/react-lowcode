import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IHoverHighlight {
    containerClassName: string;
    componentId: number
}

const HoverHighlight = ({ containerClassName, componentId }: IHoverHighlight) => {

    const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0 })

    useEffect(() => {

    }, [])

    const updatePosition = () => {
        if (!componentId) {
            return;
        }
        // container 和 node区别：container是整个组件，node是当前操作的dom
        const container = document.querySelector(`.${containerClassName}`);
        const node = document.querySelector(`[data-component-id="${componentId}"]`)

        console.log({ container, node });

        if (!container || !node) {
            return;
        }

        const { left, top, width, height } = node.getBoundingClientRect();
    }

    return createPortal((
        <div>
        </div>
    ), el);
};

export default HoverHighlight;
