import { Tree } from "antd";

import { useComponentsStore } from "../stores/components";

const OutlineView = () => {
    const { components, setCurrentComponentId } = useComponentsStore();

    return <div>
        <Tree
            showLine
            defaultExpandAll
            fieldNames={{ title: 'desc', key: 'id' }}
            treeData={components as any}
            onSelect={([selectedKey]) => setCurrentComponentId(selectedKey as number)}
        />
    </div>;
};

export default OutlineView;
