import React, { MouseEventHandler, useState } from "react"

import { IComponent, useComponentsStore } from "../stores/components"
import { useComponentConfigStore } from "../stores/component-config"
import HoverHighlight from "./HoverHighlight"
import SelectedHoverHighlight from "./SelectedHoverHighlight"

const EditorArea = () => {
    const { components, currentComponentId, setCurrentComponentId } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore()

    /**
     * 处理鼠标点击事件
     *
     * @param e 鼠标事件对象
     * @returns 无返回值
     */
    const handleClick: MouseEventHandler = (e) => {
        // 获取当前点击的元素
        const path = e.nativeEvent.composedPath()

        for (let i = 0; i < path.length; i++) {
            const element = path[i] as HTMLElement

            const componentId = element.dataset?.componentId

            if (componentId) {
                setCurrentComponentId(Number(componentId))
                return;
            }
        }
    }

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
            onClick={handleClick}
        >
            {renderComponents(components)}
            {
                hoveredComponentId && hoveredComponentId !== currentComponentId &&
                <HoverHighlight
                    portalWrapperClassName="portal-wrapper"
                    containerClassName="editor-area"
                    componentId={hoveredComponentId}
                />
            }
            {
                currentComponentId &&
                <SelectedHoverHighlight
                    portalWrapperClassName="portal-wrapper"
                    containerClassName="editor-area"
                    componentId={currentComponentId}
                />
            }
            <div className="portal-wrapper"></div>
        </div>
    )
}


export default EditorArea;
