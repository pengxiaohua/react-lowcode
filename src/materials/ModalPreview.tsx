import { forwardRef, useImperativeHandle, useState } from 'react'
import { Modal as AntdModal } from 'antd'

import { ICommonComponentProps } from './interface';

export interface ModalRef {
    open: () => void;
    close: () => void;
}

const ModalPreview: React.ForwardRefRenderFunction<ModalRef, ICommonComponentProps> =
    ({ children, title, onOk, onCancel, styles }, ref) => {
        const [open, setOpen] = useState(true)

        useImperativeHandle(ref, () => ({
            open: () => setOpen(true),
            close: () => setOpen(false),
        }), [])

        return (
            <AntdModal
                title={title}
                style={styles}
                open={open}
                onOk={() => onOk?.()}
                destroyOnClose
                onCancel={() => {
                    setOpen(false)
                    onCancel?.()
                }}
            >
                {children}
            </AntdModal>
        );
    };

export default forwardRef(ModalPreview);
