import React from "react"

import { IComponent, useComponentsStore } from "../stores/components"
import { useComponentConfigStore } from "../stores/component-config"

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

    return <div className="h-[100%]">
        {renderComponents(components)}
    </div>
}
