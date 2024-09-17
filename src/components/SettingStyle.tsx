import { Form, Input, InputNumber, Select } from 'antd';
import { CSSProperties, useEffect } from 'react';

import { IComponentSetting, useComponentConfigStore } from '../stores/component-config';
import { useComponentsStore } from '../stores/components';

const SettingStyle = () => {

    const [form] = Form.useForm();

    const { currentComponent, currentComponentId, updateStyles } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    useEffect(() => {
        const data = form.getFieldsValue();
        form.setFieldsValue({ ...data, ...currentComponent?.styles });
    }, [currentComponent])

    console.log({ currentComponentId, currentComponent });


    if (!currentComponentId || !currentComponent) return null;

    function renderFormElement(setting: IComponentSetting) {
        const { type, options } = setting;

        if (type === 'select') {
            return <Select options={options} />
        } else if (type === 'input') {
            return <Input />
        } else if (type === 'inputNumber') {
            return <InputNumber />
        }
    }

    function valueChange(changeValues: CSSProperties) {
        if (currentComponentId) {
            updateStyles(currentComponentId, changeValues);
        }
    }

    return (
        <Form
            form={form}
            onValuesChange={valueChange}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
        >
            {
                componentConfig[currentComponent.name]?.styleSetting?.map(setter => (
                    <Form.Item key={setter.name} name={setter.name} label={setter.label}>
                        {renderFormElement(setter)}
                    </Form.Item>
                ))
            }
        </Form>
    )
}


export default SettingStyle;
