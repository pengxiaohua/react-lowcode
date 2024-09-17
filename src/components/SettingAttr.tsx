import { useEffect } from "react";
import { Form, Input, Select } from "antd";

import { useComponentsStore } from "../stores/components";
import { IComponentSetting, IComponentConfig, useComponentConfigStore } from "../stores/component-config";

const SettingAttr = () => {
    const [form] = Form.useForm();

    const { currentComponent, currentComponentId, updateComponent } = useComponentsStore();

    const { componentConfig } = useComponentConfigStore();

    useEffect(() => {
        // 组件配置，更新组件
        const data = form.getFieldsValue();

        form.setFieldsValue({
            ...data,
            ...currentComponent?.props,
        });
    }, [currentComponent]);

    const renderFormElement = (item: IComponentSetting) => {
        const { type, options } = item;

        if (type === 'select') {
            return <Select options={options} />
        } else if (type === 'input') {
            return <Input />
        }
    };

    const valueChanged = (values: IComponentConfig) => {
        if (currentComponentId) {
            updateComponent(currentComponentId, values);
        }
    }

    if (!currentComponent || !currentComponentId) return null;

    return (
        <div>
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onValuesChange={valueChanged}>
                <Form.Item label="组件ID">
                    <Input disabled value={currentComponent.id} />
                </Form.Item>
                <Form.Item label="组件名称">
                    <Input disabled value={currentComponent.name} />
                </Form.Item>
                <Form.Item label="组件描述">
                    <Input disabled value={currentComponent.desc} />
                </Form.Item>
                {
                    componentConfig[currentComponent.name]?.setting?.map((item) => {
                        return (
                            <Form.Item label={item.label} key={item.name} name={item.name}>
                                {renderFormElement(item)}
                            </Form.Item>
                        )
                    })
                }
            </Form>
        </div>
    )
}

export default SettingAttr;
