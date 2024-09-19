import MonacoEditor, { OnMount, loader } from "@monaco-editor/react";

import { useComponentsStore } from "../stores/components";

const SourceCode = () => {
    const { components } = useComponentsStore()

    // 替换为其他的 CDN 地址，原npm包静态资源下载太慢，需要链接VPN之后代码editor资源才能下载
    loader.config({
        paths: {
            vs: "https://gcore.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
        },
    });

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    }

    return (
        <MonacoEditor
            height={'100%'}
            path="components.json"
            language="json"
            onMount={handleEditorMount}
            value={JSON.stringify(components, null, 2)}
            options={
                {
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    minimap: {
                        enabled: false,
                    },
                    scrollbar: {
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                    }
                }
            }
        />
    )
}

export default SourceCode;
