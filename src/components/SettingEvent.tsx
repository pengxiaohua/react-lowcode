import { useState } from 'react';
import { Collapse, Input, Button, Select, CollapseProps } from 'antd'

import { useComponentsStore } from '../stores/components';
import { IComponentEvent, useComponentConfigStore } from '../stores/component-config';
import { GoToLink, IGoToLinkProps } from './SettingGoToLink';
import { IShowMessageProps, ShowMessage } from './SettingShowMessage';
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
                <div key={event.name}>
                    {
                        (currentComponent?.props[event.name]?.actions || []).map((item: IGoToLinkProps | IShowMessageProps) => {
                            return <div key={item.text}>
                                {
                                    item.type === 'goToLink' ? <div className='border border-[#aaa] m-[10px] p-[10px]'>
                                        <div className='text-[blue]'>跳转链接</div>
                                        <div>{item.url}</div>
                                    </div> : null
                                }
                                {
                                    item.type === 'showMessage' ? <div className='border border-[#aaa] m-[10px] p-[10px]'>
                                        <div className='text-[blue]'>消息弹窗</div>
                                        <div>{item.config.type}</div>
                                        <div>{item.config.text}</div>
                                    </div> : null
                                }
                            </div>
                        })
                    }
                </div>
            )
        }
    })

    const handleModalOk = (config?: IGoToLinkProps | IShowMessageProps) => {
        console.log({ config, currentComponentId });

        if (!config || !currentEvent || !currentComponent) return

        updateComponent(currentComponentId, {
            [currentEvent.name]: {
                actions: [
                    ...(currentComponent?.props?.[currentEvent.name]?.actions || []),
                    config
                ]
            }
        })

        setActionModalOpen(false)
    }

    console.log({ actionModalOpen });


    return (
        <div className='px-[10px]'>
            <Collapse items={items} className='mb-[10px]' defaultActiveKey={componentConfig[currentComponent?.name].events?.map(item => item.name)} />
            <ActionModal
                visible={actionModalOpen}
                eventConfig={currentEvent!}
                handleOk={handleModalOk}
                handleCancel={() => {
                    setActionModalOpen(false)
                }} />
        </div>
    )
}

export default SettingEvent;
