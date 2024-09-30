import { useState } from "react";
import { Modal, Segmented } from "antd";

import { GoToLink, IGoToLinkProps } from "./SettingGoToLink";
import { IShowMessageProps, ShowMessage } from "./SettingShowMessage";

interface IActionModal {
    visible: boolean;
    handleOk: (config?: IGoToLinkProps | IShowMessageProps) => void;
    handleCancel: () => void;
}

const ActionModal = (props: IActionModal) => {
    const { visible, handleOk, handleCancel } = props;

    const [key, setKey] = useState<string>('访问链接');
    const [currentConfig, setCurrentConfig] = useState<IGoToLinkProps | IShowMessageProps>();

    return (
        <Modal
            title="事件动作配置"
            width={800}
            open={visible}
            okText='添加'
            cancelText='取消'
            onOk={() => handleOk(currentConfig)}
            destroyOnClose
            onCancel={handleCancel}
        >
            <div className="h-[500px]">
                <Segmented value={key} onChange={setKey} block options={['访问链接', '消息提示', '自定义 JS']} />
                {
                    key === '访问链接' &&
                    <GoToLink onChange={(config) => {
                        setCurrentConfig(config as IGoToLinkProps);
                    }} />
                }
                {
                    key === '消息提示' &&
                    <ShowMessage onChange={(config) => {
                        setCurrentConfig(config as IGoToLinkProps);
                    }} />}
            </div>
        </Modal >
    )
}

export default ActionModal;
