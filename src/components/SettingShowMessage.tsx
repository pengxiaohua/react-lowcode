import { useEffect, useState } from 'react'
import { Input, Select } from "antd"

import { useComponentsStore } from "../stores/components";

export interface IShowMessageConfig {
    type: 'showMessage',
    config: {
        type: 'success' | 'error'
        text: string
    }
}

export interface IShowMessageProps {
    value?: IShowMessageConfig['config']
    defaultValue?: IShowMessageConfig['config']
    onChange?: (config: IShowMessageConfig) => void
}

const ShowMessage = (props: IShowMessageProps) => {
    const { value: val, defaultValue, onChange } = props;

    const [type, setType] = useState<'success' | 'error'>(defaultValue?.type || 'success');
    const [text, setText] = useState<string>(defaultValue?.text || '');

    const { currentComponentId } = useComponentsStore();

    useEffect(() => {
        if (val) {
            setType(val.type);
            setText(val.text);
        }
    }, [val])

    function messageTypeChange(value: 'success' | 'error') {
        if (!currentComponentId) return;

        setType(value);

        onChange?.({
            type: 'showMessage',
            config: {
                type: value,
                text
            }
        })
    }

    function messageTextChange(value: string) {
        if (!currentComponentId) return;

        setText(value);

        onChange?.({
            type: 'showMessage',
            config: {
                type,
                text: value
            }
        })
    }

    return <div className='mt-[10px]'>
        <div className='flex items-center gap-[10px]'>
            <div>类型：</div>
            <div>
                <Select
                    style={{ width: 500, height: 50 }}
                    options={[
                        { label: '成功', value: 'success' },
                        { label: '失败', value: 'error' },
                    ]}
                    onChange={(value) => { messageTypeChange(value) }}
                    value={type}
                />
            </div>
        </div>
        <div className='flex items-center gap-[10px] mt-[10px]'>
            <div>文本：</div>
            <div>
                <Input
                    style={{ width: 500, height: 50 }}
                    onChange={(e) => { messageTextChange(e.target.value) }}
                    value={text}
                />
            </div>
        </div>
    </div>
}

export default ShowMessage;
