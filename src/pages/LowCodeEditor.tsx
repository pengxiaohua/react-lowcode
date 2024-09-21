import { Allotment } from "allotment";
import 'allotment/dist/style.css';

import Header from "../components/Header";
import EditorArea from "../components/EditorArea";
import SettingArea from "../components/SettingArea";
import MaterialWrapper from "../components/MaterialWrapper";
import { useComponentsStore } from "../stores/components";
import Preview from "../components/Preview";

export default function LowCodeEditor() {
    const { mode } = useComponentsStore()

    return <div className='h-[100vh] w-[100vw] flex flex-col'>
        <div className='h-[60px] flex items-center border-b-[1px] border-[#000]'>
            <Header />
        </div>
        {
            mode === 'edit'
                ?
                <Allotment>
                    <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
                        <MaterialWrapper />
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <EditorArea />
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
                        <SettingArea />
                    </Allotment.Pane>
                </Allotment>
                :
                <Preview />
        }

    </div>
}
