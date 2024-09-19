import { useState } from 'react';
import { Segmented } from 'antd';
import { ProductOutlined, PartitionOutlined, CodeOutlined } from '@ant-design/icons';

import MaterialArea from './MaterialArea';
import OutlineView from './OutlineView';
import SourceCode from './SourceCode';

const MaterialWrapper = () => {
    const [key, setKey] = useState('material');

    const options = [
        {
            label: (
                <div style={{ padding: 4 }}>
                    <div className='flex items-center'>
                        <ProductOutlined />物料
                    </div>
                </div>
            ),
            value: 'material',
        },
        {
            label: (
                <div style={{ padding: 4 }}>
                    <div className='flex items-center'>
                        <PartitionOutlined />大纲
                    </div>
                </div>
            ),
            value: 'outline',
        },
        {
            label: (
                <div style={{ padding: 4 }}>
                    <div className='flex items-center'>
                        <CodeOutlined />源码
                    </div>
                </div>
            ),
            value: 'source',
        },
    ]

    return (
        <div>
            <Segmented value={key} onChange={setKey} block options={options} />
            <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
                {
                    key === 'material' && <MaterialArea />
                }
                {
                    key === 'outline' && <OutlineView />
                }
                {
                    key === 'source' && <SourceCode />
                }
            </div>
        </div>
    );
}

export default MaterialWrapper;
