import { Input } from "antd"

import { IComponentEvent } from "../stores/component-config";
import { useComponentsStore } from "../stores/components";

export function GoToLink(props: { event: IComponentEvent }) {
    const { event } = props;

    const { currentComponentId, currentComponent, updateComponent } = useComponentsStore();

    function urlChange(eventName: string, value: string) {
        if (!currentComponentId) return;

        updateComponent(currentComponentId, {
            [eventName]: {
                ...currentComponent?.props?.[eventName],
                url: value
            }
        })
    }

    return <div className='mt-[10px]'>
        <div className='flex items-center gap-[10px]'>
            <div>链接</div>
            <div>
                <Input
                    onChange={(e) => { urlChange(event.name, e.target.value) }}
                    value={currentComponent?.props?.[event.name]?.url}
                />
            </div>
        </div>
    </div>
}
