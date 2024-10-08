import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal as AntdModal } from 'antd';

import { ICommonComponentProps } from '../interface';

export interface ModalRef {
    open: () => void;
    close: () => void;
}

// 确保 ICommonComponentProps 中不包括 ref
const ModalPreview = forwardRef<ModalRef, Omit<ICommonComponentProps, 'ref'>>(
    ({ children, title, onOk, onCancel, styles }, ref) => {
        const [isOpen, setIsOpen] = useState(true);

        useImperativeHandle(ref, () => ({
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }), []);

        return (
            <AntdModal
                title={title}
                style={styles}
                open={isOpen}
                onOk={() => onOk?.()}
                destroyOnClose
                onCancel={() => {
                    setIsOpen(false);
                    onCancel?.();
                }}
            >
                {children}
            </AntdModal>
        );
    }
);

export default ModalPreview;
