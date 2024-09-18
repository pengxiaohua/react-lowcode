import MonacoEditor, { OnMount, EditorProps, loader } from '@monaco-editor/react'
import { editor } from 'monaco-editor'

// 替换为其他的 CDN 地址，原npm包静态资源下载太慢，需要链接VPN之后代码editor资源才能下载
loader.config({
    paths: {
        vs: "https://gcore.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
    },
});

export interface IEditorFile {
    name: string
    value: string
    language: string
}

interface Props {
    value: string
    onChange?: EditorProps['onChange']
    options?: editor.IStandaloneEditorConstructionOptions
}

const CSSEditor = ({ value, onChange, options }: Props) => {

    /**
     * 编辑器挂载时的处理函数
     *
     * @param editor 编辑器实例
     * @param monaco Monaco 编辑器 API
     * @returns 无返回值
     */
    const handleEditorMount: OnMount = (editor, monaco) => {
        // 设置快捷键，格式化代码
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    }

    return (
        <MonacoEditor
            height="100%"
            path='component.css'
            language='css'
            onMount={handleEditorMount}
            onChange={onChange}
            theme={'vs-dark'}
            value={value}
            options={
                {
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    minimap: { enabled: false },
                    scrollbar: {
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                    },
                    ...options
                }
            }
        />
    )
}

export default CSSEditor;
