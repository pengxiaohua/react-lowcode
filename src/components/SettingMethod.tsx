import { TreeSelect, Select } from 'antd'

import { useEffect, useState } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { IComponent, getComponentById, useComponentsStore } from "../stores/components";

export interface IComponentMethodConfig {
    type: 'method',
    config: {
        componentId: number,
        method: string
    }
}

export interface IComponentMethodProps {
    value?: IComponentMethodConfig['config']
    onChange?: (config: IComponentMethodConfig) => void
}
const SettingMethod = (props: IComponentMethodProps) => {
    const { value, onChange } = props;

    const { components, currentComponentId } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();
    const [selectedComponent, setSelectedComponent] = useState<IComponent | null>();

    const [currentId, setCurrentId] = useState<number>();
    const [currentMethod, setCurrentMethod] = useState<string>();

    useEffect(() => {
        if (value) {
            setCurrentId(value.componentId);
            setCurrentMethod(value.method);

            setSelectedComponent(getComponentById(value.componentId, components));
        }
    }, [value])

    const handleComponentChange = (value: number) => {
        if (!currentComponentId) return;

        setSelectedComponent(getComponentById(value, components))
    }

    const handleComponentMethodChange = (value: string) => {
        if (!currentComponentId || !selectedComponent) return;

        setCurrentMethod(value);

        onChange?.({
            type: 'method',
            config: {
                componentId: selectedComponent.id,
                method: value
            }
        })
    }

    return (
        <div className="mt-[40px]">
            <div className="flex items-center gap-[10px]">
                <div>组件: </div>
                <div>
                    <TreeSelect
                        style={{ width: 200, height: 50 }}
                        treeData={components}
                        value={currentId}
                        fieldNames={{
                            label: 'name',
                            value: 'id',
                        }}
                        onChange={handleComponentChange}
                    />
                </div>
            </div>
            {
                componentConfig[selectedComponent?.name || ''] &&
                <div className='flex items-center gap-[10px] mt-[20px]'>
                    <div>方法:</div>
                    <div>
                        <Select
                            style={{ width: 200, height: 50 }}
                            value={currentMethod}
                            options={componentConfig[selectedComponent?.name || ''].methods?.map(
                                method => ({
                                    label: method.label,
                                    value: method.name
                                })
                            )}
                            onChange={handleComponentMethodChange}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default SettingMethod;
