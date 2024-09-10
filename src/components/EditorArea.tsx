import React, { useEffect } from "react"

import { IComponent, useComponentsStore } from "../stores/components"
import { useComponentConfigStore } from "../stores/component-config"

export function EditorArea() {
    const { components, addComponent, updateComponent } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore()

    // useEffect(() => {
    //     addComponent({
    //         id: 222,
    //         name: "Container",
    //         props: {},
    //         children: [],
    //     }, 1)

    //     addComponent({
    //         id: 333,
    //         name: 'Button',
    //         props: {
    //             text: '无敌'
    //         },
    //         children: []
    //     }, 222);
    // }, [])

    const renderComponents = (components: IComponent[]): React.ReactNode => {
        return components.map((component) => {

            const config = componentConfig?.[component.name]

            if (!componentConfig[component.name]) return null

            // 这里可以自定义组件的渲染方式
            return React.createElement(
                config.component,
                {
                    key: component.id,
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
