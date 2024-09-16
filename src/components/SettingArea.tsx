import { useState } from "react";
import { Segmented } from "antd";

import SettingAttr from "./SettingAttr";
import SettingStyle from "./SettingStyle";
import SettingEvent from "./SettingEvent";
import { useComponentsStore } from "../stores/components";

const SettingArea = () => {
    const [key, setKey] = useState<string>("属性");
    const { currentComponentId } = useComponentsStore();

    if (!currentComponentId) return null;

    return (
        <div className="setting">
            <Segmented value={key} onChange={setKey} block options={['属性', '样式', '事件']} />
            <div>
                {
                    key === '属性' && <SettingAttr />
                }
                {
                    key === '样式' && <SettingStyle />
                }
                {
                    key === '事件' && <SettingEvent />
                }
            </div>
        </div>
    );

}

export default SettingArea;
