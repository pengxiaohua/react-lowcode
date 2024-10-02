import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

import { useComponentsStore } from "../stores/components";

export interface GoToLinkConfig {
    type: 'goToLink',
    url: string
}

export interface IGoToLinkProps {
    value?: string
    defaultValue?: string
    onChange?: (config: GoToLinkConfig) => void
}

export function GoToLink(props: IGoToLinkProps) {
    const { defaultValue, onChange, value: val } = props;

    const [value, setValue] = useState(defaultValue);

    const { currentComponentId } = useComponentsStore();

    useEffect(() => {
        setValue(val);
    }, [val])

    function urlChange(value: string) {
        if (!currentComponentId) return;

        setValue(value);

        onChange?.({
            type: 'goToLink',
            url: value
        });
    }

    return <div className='mt-[10px]'>
        <div className='flex items-center gap-[10px]'>
            <div>跳转链接</div>
            <div>
                <TextArea
                    style={{ height: 200, width: 500, border: '1px solid #000' }}
                    onChange={(e) => { urlChange(e.target.value) }}
                    value={value || ''}
                />
            </div>
        </div>
    </div>
}
