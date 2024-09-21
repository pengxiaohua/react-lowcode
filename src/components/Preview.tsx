import { ReactNode } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponentsStore, IComponentSetting } from '../stores/components'

const Preview = () => {
    return (
        <div className="preview">
            <h1>Preview</h1>
        </div>
    );
};

export default Preview;
