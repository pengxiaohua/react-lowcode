import { useEffect, useState } from "react";
import { Modal, Segmented } from "antd";

import SettingCommon from "./SettingCustom";
import { GoToLink, IGoToLinkProps } from "./SettingGoToLink";
import { IShowMessageProps, ShowMessage } from "./SettingShowMessage";
import { ICustomJSConfig } from "./SettingCustom";

interface IActionModal {
    visible: boolean;
    action: IActionConfig
    handleOk: (config?: IGoToLinkProps | IShowMessageProps) => void;
    handleCancel: () => void;
}

export type IActionConfig = IGoToLinkProps | IShowMessageProps | ICustomJSConfig

const ActionModal = (props: IActionModal) => {
    const { visible, handleOk, handleCancel, action } = props;

    const map = {
        goToLink: '访问链接',
        showMessage: '消息提示',
        customJS: '自定义 JS'
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
                <Segmented value={key} onChange={setKey} block options={['访问链接', '消息提示', '自定义 JS']} />
                {
                    key === '访问链接' &&
                    <GoToLink
                        onChange={(config) => {
                            setCurrentConfig(config as IGoToLinkProps);
                        }}
                        value={action?.type === 'goToLink' ? action?.url : ''}
                    />
                }
                {
                    key === '消息提示' &&
                    <ShowMessage
                        onChange={(config) => {
                            setCurrentConfig(config as IShowMessageProps);
                        }}
                        value={action?.type === 'showMessage' ? action?.config : undefined}
                    />
                }
                {
                    key === '自定义 JS' &&
                    <SettingCommon
                        onChange={(config) => {
                            setCurrentConfig(config as ICustomJSConfig);
                        }}
                        value={action?.type === 'customJS' ? action?.code : ''}
                    />
                }
            </div>
        </Modal >
    )
}

export default ActionModal;
