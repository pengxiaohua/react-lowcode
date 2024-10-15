import { useEffect, useState } from 'react';
import { useComponentsStore } from '../stores/components';
import MonacoEditor, { OnMount } from '@monaco-editor/react'

export interface ICustomJSConfig {
    type: 'customJS',
    code: string
}

export interface ICustomJSProps {
    value?: string
    defaultValue?: string
    onChange?: (config: ICustomJSConfig) => void
}

const SettingCommon = ({ defaultValue, onChange, value: val }: ICustomJSProps) => {
    const { currentComponentId } = useComponentsStore();
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(val);
    }, [val])

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run();
        })
    }

    const codeChange = (code?: string) => {
        if (!currentComponentId) return;

        setValue(code);
        onChange?.({ type: 'customJS', code: code! });
    };

    return (
        <div className='mt=[40px]'>
            <div className='flex items-start gap-[20px]'>
                <div>自定义JS</div>
                <div>
                    <MonacoEditor
                        width={'600px'}
                        height={'400px'}
                        path='action.js'
                        language='javascript'
                        onMount={handleEditorMount}
                        onChange={codeChange}
                        value={value}
                        options={
                            {
                                fontSize: 14,
                                scrollBeyondLastLine: false,
                                minimap: {
                                    enabled: false,
                                },
                                scrollbar: {
                                    verticalSliderSize: 6,
                                    horizontalSliderSize: 6,
                                }
                            }
                        }
                    />
                </div>
            </div>
        </div >
    );
};

export default SettingCommon;