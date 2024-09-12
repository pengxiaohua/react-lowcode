import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, Space } from 'antd'

import { useComponentsStore, getComponentById } from "../stores/components";

interface IProps {
    portalWrapperClassName: string
    containerClassName: string
    componentId: number;
}

const SelectedHoverHighlight = ({ portalWrapperClassName, containerClassName, componentId }: IProps) => {

    const [position, setPosition] = useState({
        left: 0, top: 0, width: 0, height: 0, labelTop: 0, labelLeft: 0
    })

    const { components, currentComponentId, removeComponent, setCurrentComponentId } = useComponentsStore();

    useEffect(() => {
        updatePosition();
    }, [componentId])

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
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

        // labelTop 高亮框一样，齐平
        let labelTopValue = top - containerTop + container.scrollTop;
        // labelLeft 是高亮框的 left，加上高亮框宽度
        const labelLeftValue = left - containerLeft + width;

        if (labelTopValue < 0) {
            labelTopValue -= -10;
        }

        setPosition({
            left: left - containerLeft + container.scrollTop,
            top: top - containerTop + container.scrollTop,
            width,
            height,
            labelTop: labelTopValue,
            labelLeft: labelLeftValue
        })
    }

    const handleDelete = () => {
        removeComponent(currentComponentId!);
        setCurrentComponentId(null);
    }

    const currentComponent = useMemo(() => {
        return getComponentById(componentId, components);
    }, [componentId])

    // 创建 portal 挂载的容器元素
    const element = useMemo(() => {
        const el = document.querySelector(`.${portalWrapperClassName}`) as Element | DocumentFragment;
        return el;
    }, [])

    // 注释：创建一个 div 挂载在容器下，用于存放 portal，这样就能脱离容器，实现脱离容器的 高亮
    return createPortal((
        <>
            <div
                style={{
                    position: "absolute",
                    left: position.left,
                    top: position.top,
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    border: "1px dashed #1890ff",
                    pointerEvents: "none",
                    width: position.width,
                    height: position.height,
                    zIndex: 12,
                    borderRadius: 4,
                    boxSizing: 'border-box',
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: position.labelLeft,
                    top: position.labelTop,
                    fontSize: "14px",
                    zIndex: 13,
                    display: (!position.width || position.width < 10) ? "none" : "inline",
                    transform: 'translate(-100%, -100%)',
                }}
            >
                <Space>
                    <div
                        style={{
                            padding: '0 8px',
                            backgroundColor: '#1890ff',
                            borderRadius: 4,
                            color: '#fff',
                            cursor: "pointer",
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {currentComponent?.name}
                    </div>
                    {
                        currentComponentId !== 1 && (
                            <div style={{ padding: '0 8px', backgroundColor: '#1890ff' }}>
                                <Popconfirm
                                    title="确认删除？"
                                    okText={'确认'}
                                    cancelText={'取消'}
                                    onConfirm={handleDelete}
                                >
                                    <DeleteOutlined style={{ color: '#fff' }} />
                                </Popconfirm>
                            </div>
                        )
                    }
                </Space>
            </div>
        </>
    ), element);
};

export default SelectedHoverHighlight;
