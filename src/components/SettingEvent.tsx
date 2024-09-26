import { useState } from 'react';
import { Collapse, Input, Button, Select, CollapseProps } from 'antd'

import { useComponentsStore } from '../stores/components';
import { IComponentEvent, useComponentConfigStore } from '../stores/component-config';
import { GoToLink } from './SettingGoToLink';
import { ShowMessage } from './SettingShowMessage';
import ActionModal from './ActionModal';

const SettingEvent = () => {
    const { currentComponentId, currentComponent, updateComponent } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    const [actionModalOpen, setActionModalOpen] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<IComponentEvent>()

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
            label: <div className='flex justify-between leading-[30px]'>
                {event.label}
                <Button type="primary" onClick={(e) => {
                    e.stopPropagation()
                    setCurrentEvent(event);
                    setActionModalOpen(true);
                }}>添加动作</Button>
            </div>,
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
            <ActionModal visible={actionModalOpen} eventConfig={currentEvent!} handleOk={() => {
                setActionModalOpen(false)
            }} handleCancel={() => {
                setActionModalOpen(false)
            }} />
        </div>
    )
}

export default SettingEvent;
