import React, { useState } from "react"

import { IComponent, useComponentsStore } from "../stores/components"
import { useComponentConfigStore } from "../stores/component-config"
import HoverHighlight from "./HoverHighlight"

export function EditorArea() {
    const { components } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore()

    const renderComponents = (components: IComponent[]): React.ReactNode => {
        return components.map((component) => {

            const config = componentConfig?.[component.name]

            if (!componentConfig[component.name]) return null

            // 这里可以自定义组件的渲染方式
            return React.createElement(
                config.component,
                {
                    key: component.id,
                    id: component.id,
                    ...config.defaultProps,
                    ...component.props,
                },
                // 递归渲染子组件
                renderComponents(component.children || []))
        })
    }

    const [hoveredComponentId, setHoveredComponentId] = useState<number | undefined>()

    /**
     * 鼠标悬停事件处理函数
     *
     * @param e React鼠标事件对象
     */
    const handleMouseOver: React.MouseEventHandler<HTMLDivElement> = (e) => {
        // 获取当前鼠标悬停的元素
        const target = (e.target as HTMLElement).closest('[data-component-id]');
        if (target) {
            const componentId = target.getAttribute('data-component-id');
            // 设置当前hover的组件ID, 为当前元素的data-component-id属性值
            if (componentId) {
                setHoveredComponentId(Number(componentId))
            }
        }
    }

    return (
        <div className="h-[100%] editor-area"
            onMouseOver={handleMouseOver}
            onMouseLeave={() => setHoveredComponentId(undefined)}
        >
            {renderComponents(components)}
            {
                hoveredComponentId &&
                <HoverHighlight
                    portalWrapperClassName="portal-wrapper"
                    containerClassName="editor-area"
                    componentId={hoveredComponentId}
                />
            }
            <div className="portal-wrapper"></div>
        </div>
    )
}
