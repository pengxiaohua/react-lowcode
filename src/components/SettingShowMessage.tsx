import { Input, Select } from "antd"

import { IComponentEvent } from "../stores/component-config";
import { useComponentsStore } from "../stores/components";


export function ShowMessage(props: { event: IComponentEvent }) {
    const { event } = props;

    const { currentComponentId, currentComponent, updateComponent } = useComponentsStore();

    function messageTypeChange(eventName: string, value: string) {
        if (!currentComponentId) return;

        updateComponent(currentComponentId, {
            [eventName]: {
                ...currentComponent?.props?.[eventName],
                config: {
                    ...currentComponent?.props?.[eventName]?.config,
                    type: value,
                },
            }
        })
    }

    function messageTextChange(eventName: string, value: string) {
        if (!currentComponentId) return;

        updateComponent(currentComponentId, {
            [eventName]: {
                ...currentComponent?.props?.[eventName],
                config: {
                    ...currentComponent?.props?.[eventName]?.config,
                    text: value,
                },
            },
        })
    }

    return <div className='mt-[10px]'>
        <div className='flex items-center gap-[10px]'>
            <div>类型：</div>
            <div>
                <Select
                    style={{ width: 160 }}
                    options={[
                        { label: '成功', value: 'success' },
                        { label: '失败', value: 'error' },
                    ]}
                    onChange={(value) => { messageTypeChange(event.name, value) }}
                    value={currentComponent?.props?.[event.name]?.config?.type}
                />
            </div>
        </div>
        <div className='flex items-center gap-[10px] mt-[10px]'>
            <div>文本：</div>
            <div>
                <Input
                    onChange={(e) => { messageTextChange(event.name, e.target.value) }}
                    value={currentComponent?.props?.[event.name]?.config?.text}
                />
            </div>
        </div>
    </div>
}
