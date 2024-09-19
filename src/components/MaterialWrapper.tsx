import { useState } from 'react';
import { Segmented } from 'antd';
import MaterialArea from './MaterialArea';

const MaterialWrapper = () => {
    const [key, setKey] = useState('物料');

    return (
        <div>
            <Segmented value={key} onChange={setKey} block options={['属性', '样式', '事件']} />
            <div className="pt-[20px]">
                {
                    key === '属性' && <MaterialArea />
                }
                {
                    key === '样式' && <Outline />
                }
                {
                    key === '事件' && <SourceCode />
                }
            </div>
        </div>
    );
}

export default MaterialWrapper;
