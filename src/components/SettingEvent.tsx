import { useState } from 'react';
import { Collapse, Button, CollapseProps } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useComponentsStore } from '../stores/components';
import { IComponentEvent, useComponentConfigStore } from '../stores/component-config';
import { IGoToLinkProps } from './SettingGoToLink';
import { IShowMessageProps } from './SettingShowMessage';
import ActionModal, { IActionConfig } from './ActionModal';

const SettingEvent = () => {
    const { currentComponentId, currentComponent, updateComponent } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    const [actionModalOpen, setActionModalOpen] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<IComponentEvent>()
    const [currentAction, setCurrentAction] = useState<IActionConfig>()
    const [currentActionIndex, setCurrentActionIndex] = useState<number>()

    const handleDelete = (event: IComponentEvent, index: number) => {
        if (!currentComponentId) return

        const actions = currentComponent?.props?.[event.name]?.actions || [];
        actions.splice(index, 1)

        updateComponent(currentComponentId, {
            [event.name]: { actions }
        })
    }

    const handleEdit = (config: IActionConfig, index: number) => {
        if (!currentComponent) {
            return;
        }

        setCurrentAction(config);

        setCurrentActionIndex(index);

        setActionModalOpen(true);
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
                        (currentComponent?.props[event.name]?.actions || []).map((item: IGoToLinkProps | IShowMessageProps, index: number) => {
                            return <div key={item.value}>
                                {
                                    item.type === 'goToLink' ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                        <div className='text-[blue]'>跳转链接</div>
                                        <div>{item.url}</div>
                                        <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                            onClick={() => handleEdit(item, index)}
                                        >
                                            <EditOutlined />
                                        </div>
                                        <div
                                            style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                            onClick={() => handleDelete(event, index)}
                                        >
                                            <DeleteOutlined />
                                        </div>
                                    </div> : null
                                }
                                {
                                    item.type === 'showMessage' ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                        <div className='text-[blue]'>消息弹窗</div>
                                        <div>{item.config.type}</div>
                                        <div>{item.config.text}</div>
                                        <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                            onClick={() => handleEdit(item, index)}
                                        >
                                            <EditOutlined />
                                        </div>
                                        <div
                                            style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                            onClick={() => handleDelete(event, index)}
                                        >
                                            <DeleteOutlined />
                                        </div>
                                    </div> : null
                                }
                                {
                                    item.type === 'customJS' ? <div key="customJS" className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                        <div className='text-[blue]'>自定义 JS</div>
                                        <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                            onClick={() => handleEdit(item, index)}
                                        >
                                            <EditOutlined />
                                        </div>
                                        <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                            onClick={() => handleDelete(event, index)}
                                        >
                                            <DeleteOutlined />
                                        </div>
                                    </div> : null
                                }
                            </div>
                        })
                    }
                </div>
            )
        }
    })

    const handleModalOk = (config?: IActionConfig) => {
        if (!config || !currentEvent || !currentComponent) return

        if (currentAction) {
            updateComponent(currentComponent.id, {
                [currentEvent.name]: {
                    actions: currentComponent?.props?.[currentEvent.name]?.actions.map((item: IActionConfig, index: number) => {
                        return index === currentActionIndex ? config : item
                    })
                }
            })
        } else {
            updateComponent(currentComponent.id, {
                [currentEvent.name]: {
                    actions: [
                        ...(currentComponent?.props?.[currentEvent.name]?.actions || []),
                        config
                    ]
                }
            })
        }

        setCurrentAction(undefined)

        setActionModalOpen(false)
    }


    return (
        <div className='px-[10px]'>
            <Collapse items={items} className='mb-[10px]' defaultActiveKey={componentConfig[currentComponent?.name].events?.map(item => item.name)} />
            <ActionModal
                visible={actionModalOpen}
                eventConfig={currentEvent!}
                handleOk={handleModalOk}
                handleCancel={() => {
                    setActionModalOpen(false)
                }}
                action={currentAction}
            />
        </div>
    )
}

export default SettingEvent;
