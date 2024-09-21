import React from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponentsStore, IComponent } from '../stores/components'

const Preview = () => {
    const { components } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    const renderComponents = (components: IComponent[]): React.ReactNode => {
        return components.map((component: IComponent) => {
            const config = componentConfig?.[component.name]

            if (!config) return null;

            return React.createElement(
                config.preview,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    styles: component.styles,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            );
        })
    };

    return (
        <div>
            {renderComponents(components)}
        </div>
    );
};

export default Preview;
