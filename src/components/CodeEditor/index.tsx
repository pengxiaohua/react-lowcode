import MonacoEditor, { EditorProps, OnMount } from '@monaco-editor/react'
import editor from 'monaco-editor'

import { createATA } from '../../util/ata';

export interface IEditorFile {
    name: string
    value: string
    language: string
}

interface IProps {
    file: IEditorFile
    onChange?: EditorProps['onChange']
    options?: editor.IStandaloneEditorConstructionOptions
}

export default function CodeEditor(props: IProps) {
    const { file, onChange, options } = props
    const code = `export default function App() {
        return <div>xxx</div>
    }
        `;

    // 修改编辑器的 tsconfig, 让编辑器识别jsx或者tsx文件内容
    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
        })

        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
        })

        editor.onDidChangeModelContent(() => {
            ata(editor.getValue())
        })

        ata(editor.getValue());
    }

    return <MonacoEditor
        height='100%'
        path={file.name}
        language={file.language}
        onChange={onChange}
        onMount={handleEditorMount}
        value={code}
        options={{
            // 关闭右侧缩略图
            minimap: {
                enabled: false
            },
            fontSize: 14,
            scrollBeyondLastLine: false,
            scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6
            },
            ...options
        }}
    />
}