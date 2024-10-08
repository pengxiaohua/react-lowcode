import { useEffect, useRef, useMemo, Children } from 'react'
import { Form as AntdForm, Input } from 'antd'
import { useDrag } from 'react-dnd'

import { ICommonComponentProps } from '../interface'
import useMaterialsDrop from '../../hooks/useMaterialsDrop'

const FormEdit = ({ id, name, children, onSubmit }: ICommonComponentProps) => {
    const [form] = AntdForm.useForm();
    const { canDrop, drop } = useMaterialsDrop(['FormItem'], id);

    const divRef = useRef<HTMLDivElement>(null);

    const [_, drag] = useDrag({
        type: name,
        item: { type: name, id, dragType: 'move' },
    })

    useEffect(() => {
        drop(divRef);
        drag(divRef)
    }, [])

    const formItems = useMemo(() => {
        return Children.map(children, (child: any) => {
            const { label, name, type, id } = child.props;
            return {
                label,
                name,
                type,
                id
            }
        });
    }, [children])

    return (
        <div
            ref={divRef}
            data-component-id={id}
            className={`w-[100%] p-[20px] min-h-[100px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            <AntdForm labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form} onFinish={(values) => {
                onSubmit?.(values)
            }}>
                {formItems.map((item: any) => {
                    return <AntdForm.Item key={item.name} data-component-id={item.id} name={item.name} label={item.label} >
                        <Input style={{ pointerEvents: 'none' }} />
                    </AntdForm.Item>
                })}
            </AntdForm>
        </div>
    )
}

export default FormEdit;
