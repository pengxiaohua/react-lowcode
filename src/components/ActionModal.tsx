import { useEffect, useState } from "react";
import { Modal, Segmented } from "antd";

import GoToLink, { IGoToLinkConfig } from "./SettingGoToLink";
import ShowMessage, { IShowMessageConfig } from "./SettingShowMessage";
import SettingCommon, { ICustomJSConfig } from "./SettingCustom";
import SettingMethod, { IComponentMethodConfig } from "./SettingMethod";

export type IActionConfig = IGoToLinkConfig | IShowMessageConfig | ICustomJSConfig | IComponentMethodConfig
interface IActionModalProps {
    visible: boolean;
    action: IActionConfig
    handleOk: (config?: IActionConfig) => void;
    handleCancel: () => void;
}

const ActionModal = (props: IActionModalProps) => {
    const { visible, handleOk, handleCancel, action } = props;

    const map = {
        goToLink: '访问链接',
        showMessage: '消息提示',
        customJS: '自定义 JS',
        method: '组件方法'
    }

    const [key, setKey] = useState<string>('访问链接');
    const [currentConfig, setCurrentConfig] = useState<IActionConfig>();

    useEffect(() => {
        if (action?.type) {
            setKey(map[action.type]);
        }
    }, [action])

    return (
        <Modal
            title="事件动作配置"
            width={800}
            open={visible}
            okText='确认'
            cancelText='取消'
            onOk={() => handleOk(currentConfig)}
            destroyOnClose
            onCancel={handleCancel}
        >
            <div className="h-[500px]">
                <Segmented value={key} onChange={setKey} block options={['访问链接', '消息提示', '组件方法', '自定义 JS']} />
                {
                    key === '访问链接' &&
                    <GoToLink
                        key='goToLink'
                        onChange={(config) => {
                            setCurrentConfig(config);
                        }}
                        value={action?.type === 'goToLink' ? action?.url : ''}
                    />
                }
                {
                    key === '消息提示' &&
                    <ShowMessage
                        key='showMessage'
                        onChange={(config) => {
                            setCurrentConfig(config);
                        }}
                        value={action?.type === 'showMessage' ? action?.config : undefined}
                    />
                }
                {
                    key === '组件方法' &&
                    <SettingMethod
                        key="method"
                        onChange={(config) => {
                            setCurrentConfig(config);
                        }}
                        value={action?.type === 'method' ? action?.config : undefined}
                    />
                }
                {
                    key === '自定义 JS' &&
                    <SettingCommon
                        key="customJS"
                        onChange={(config) => {
                            setCurrentConfig(config);
                        }}
                        value={action?.type === 'customJS' ? action?.code : ''}
                    />
                }
            </div>
        </Modal >
    )
}

export default ActionModal;
