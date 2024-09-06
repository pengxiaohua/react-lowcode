import { Allotment } from "allotment";
import 'allotment/dist/style.css';
import Header from "../../components/Header";
import CodeEditor from "../../components/CodeEditor";
import FileNameList from "../../components/FileNameList";
import Preview from "../../components/Preview";

export default function ReactPlayground() {
    const file = {
        name: 'guang.tsx',
        value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
        language: 'typescript'
    }

    function onEditorChange() {
        console.log(...arguments);
    }

    return <div style={{ height: '100vh', width: '100vw' }}>
        <Header />
        <Allotment defaultSizes={[100, 100]}>
            <Allotment.Pane minSize={0}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <FileNameList />
                    <CodeEditor file={file} onChange={onEditorChange} />
                </div>
            </Allotment.Pane>
            <Allotment.Pane minSize={0}>
                <Preview />
            </Allotment.Pane>
        </Allotment>
    </div>
}