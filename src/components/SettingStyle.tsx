import { CSSProperties, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'

import CSSEditor from './CSSEditor';
import { IComponentSetting, useComponentConfigStore } from '../stores/component-config';
import { useComponentsStore } from '../stores/components';

const SettingStyle = () => {
    const [css, setCss] = useState<string>(`.comp{\n\n}`);
    const [form] = Form.useForm();

    const { currentComponent, currentComponentId, updateStyles } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    useEffect(() => {
        form.resetFields();

        const data = form.getFieldsValue();
        form.setFieldsValue({ ...data, ...currentComponent?.styles });

        setCss(toCssString(currentComponent?.styles!))
    }, [currentComponent])

    const toCssString = (css: Record<string, any>) => {
        let str = `.comp {\n`;
        for (const key in css) {
            let value = css[key];

            if (!value) {
                continue;
            }
            if (['width', 'height'].includes(key) && !value.toString().endsWith('px')) {
                value += 'px';
            }
            str += `\t${key}: ${value};\n`
        }
        str += `}`;
        return str;
    }


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

    const handleEditorChange = debounce((value) => {
        setCss(value);

        const css: Record<string, any> = {};

        try {
            const cssStr = value.replace(/\/\*.*\*\//, '') // 去掉注释 /** */
                .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
                .replace('}', '');// 去掉 }

            styleToObject(cssStr, (name, value) => {
                css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
            });

            updateStyles(currentComponentId, { ...form.getFieldsValue(), ...css }, true);
        } catch (e) { }
    }, 500)

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
            <div className='h-[200px] border-[1px] border-[#ccc]'>
                <CSSEditor value={css} onChange={handleEditorChange} />
            </div>
        </Form>
    )
}

export default SettingStyle;
