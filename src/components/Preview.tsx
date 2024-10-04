import React, { useRef } from "react";
import { message } from 'antd'

import { useComponentConfigStore } from "../stores/component-config";
import { useComponentsStore, IComponent } from '../stores/components'
import { IActionConfig } from "./ActionModal";

const Preview = () => {
    const { components } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    const componentRefs = useRef<Record<string, any>>({});

    const handleEvent = (component: IComponent) => {
        const props: Record<string, any> = {};

        componentConfig[component.name].events?.forEach((event) => {
            const eventConfig = component.props[event.name];

            if (eventConfig) {
                props[event.name] = () => {
                    eventConfig?.actions?.forEach((action: IActionConfig) => {
                        if (action.type === "goToLink" && action.url) {
                            window.location.href = action.url;
                        } else if (action.type === 'showMessage') {
                            if (action.config.type === 'success') {
                                message.success(action.config.text)
                            } else if (action.config.type === 'error') {
                                message.error(action.config.text)
                            }
                        } else if (action.type === 'method') {
                            const component = componentRefs.current[action.config.componentId];

                            if (component) {
                                component[action.config.method]?.();
                            }
                        } else if (action.type === 'customJS') {
                            const fn = new Function(action.code);
                            fn();
                        }
                    })
                };
            }
        });

        return props;
    }

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
                    ref: (ref: Record<string, any>) => { componentRefs.current[component.id] = ref; },
                    ...config.defaultProps,
                    ...component.props,
                    ...handleEvent(component),
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
