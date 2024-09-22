import { Collapse, Input, Select, CollapseProps } from 'antd'

import { useComponentsStore } from '../stores/components';
import { useComponentConfigStore } from '../stores/component-config';
import { GoToLink } from './SettingGoToLink';
import { ShowMessage } from './SettingShowMessage';

const SettingEvent = () => {
    const { currentComponentId, currentComponent, updateComponent } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    const selectAction = (name: string, type: string) => {
        if (!currentComponentId) return

        updateComponent(currentComponentId, {
            [name]: { type }
        })
    }

    const urlChange = (eventName: string, value: string) => {
        if (!currentComponentId) return

        updateComponent(currentComponentId, {
            [eventName]: {
                ...currentComponent?.props?.[eventName],
                url: value
            }
        })
    }

    const items: CollapseProps['items'] = (componentConfig[currentComponent.name].events || []).map(event => {
        return {
            key: event.name,
            label: event.label,
            children: (
                <div>
                    <div className='flex items-center'>
                        <div>动作：</div>
                        <Select
                            className='w-[160px]'
                            value={currentComponent?.props?.[event.name]?.type}
                            options={[
                                { label: '显示提示', value: 'showMessage' },
                                { label: '跳转链接', value: 'goToLink' }
                            ]}
                            onChange={
                                (value) => selectAction(event.name, value)
                            }
                        />
                    </div>
                    {
                        currentComponent?.props?.[event.name]?.type === 'goToLink' && (
                            <GoToLink event={event} />
                        )
                    }
                    {
                        currentComponent?.props?.[event.name]?.type === 'showMessage' && (
                            <ShowMessage event={event} />
                        )
                    }
                </div>
            )
        }
    })

    return (
        <div className='px-[10px]'>
            <Collapse items={items} className='mb-[10px]' />
        </div>
    )
}

export default SettingEvent;
