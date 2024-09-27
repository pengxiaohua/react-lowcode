import React from "react";
import { message } from 'antd'

import { useComponentConfigStore } from "../stores/component-config";
import { useComponentsStore, IComponent } from '../stores/components'
import { IGoToLinkProps } from "./SettingGoToLink";
import { IShowMessageProps } from "./SettingShowMessage";

const Preview = () => {
    const { components } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    const handleEvent = (component: IComponent) => {
        const props: Record<string, any> = {};

        componentConfig[component.name].events?.forEach((event) => {
            const eventConfig = component.props[event.name];

            if (eventConfig) {
                const { type } = eventConfig;

                props[event.name] = () => {
                    eventConfig?.actions?.forEach((actions: IGoToLinkProps | IShowMessageProps) => {
                        if (type === "goToLink" && actions.url) {
                            window.location.href = actions.url;
                        } else if (type === 'showMessage' && actions.config) {
                            if (actions.config.type === 'success') {
                                message.success(actions.config.text)
                            } else if (actions.config.type === 'error') {
                                message.error(actions.config.text)
                            }
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
