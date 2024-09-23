import { useState } from "react";
import { Modal, Segmented } from "antd";

import { GoToLink } from "./SettingGoToLink";
import { ShowMessage } from "./SettingShowMessage";
import { IComponentEvent } from "../stores/component-config";

interface IActionModal {
    visible: boolean;
    eventConfig: IComponentEvent
    handleOk: () => void;
    handleCancel: () => void;
}

const ActionModal = (props: IActionModal) => {
    const { visible, eventConfig, handleOk, handleCancel } = props;

    const [key, setKey] = useState<string>('访问链接');

    return (
        <Modal
            title="事件动作配置"
            width={800}
            open={visible}
            okText='添加'
            cancelText='取消'
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className="h-[500px]">
                <Segmented value={key} onChange={setKey} block options={['访问链接', '消息提示', '自定义 JS']} />
                {
                    key === '访问链接' && <GoToLink event={eventConfig} />
                }
                {
                    key === '消息提示' && <ShowMessage event={eventConfig} />
                }
            </div>
        </Modal >
    )
}

export default ActionModal;
