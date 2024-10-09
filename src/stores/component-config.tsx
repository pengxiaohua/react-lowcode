import { create } from 'zustand';
import ContainerEdit from '../materials/Container/edit';
import ContainerPreview from '../materials/Container/preview';
import ButtonEdit from '../materials/Button/edit';
import ButtonPreview from '../materials/Button/preview';
import PageEdit from '../materials/Page/edit';
import PagePreview from '../materials/Page/preview';
import ModalEdit from '../materials/Modal/edit';
import ModalPreview from '../materials/Modal/preview';
import FormEdit from '../materials/Form/edit';
import FormPreview from '../materials/Form/preview';
import FormItemEdit from '../materials/FormItem/edit';
import FormItemPreview from '../materials/FormItem/preview';

export interface IComponentSetting {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}

export interface IComponentEvent {
    name: string
    label: string
}

export interface IComponentMethodProps {
    name: string
    label: string
}

export interface IComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    desc: string;
    setting?: IComponentSetting[];
    styleSetting?: IComponentSetting[];
    // component: any;
    edit: any;
    preview: any;
    events?: IComponentEvent[];
    methods?: IComponentMethodProps[]
}

interface IState {
    componentConfig: { [key: string]: IComponentConfig };
}

interface IAction {
    registerComponent: (name: string, componentConfig: IComponentConfig) => void
}

export const useComponentConfigStore = create<IState & IAction>((set) => ({
    // key 是组件名，value 是组件配置
    componentConfig: {
        FormItem: {
            name: 'FormItem',
            defaultProps: {
                name: new Date().getTime(),
                label: '姓名',
            },
            desc: '表单项',
            setting: [
                {
                    name: 'type',
                    label: '类型',
                    type: 'select',
                    options: [
                        {
                            label: '文本',
                            value: 'input',
                        },
                        {
                            label: '日期',
                            value: 'date',
                        },
                    ],
                },
                {
                    name: 'label',
                    label: '标题',
                    type: 'input',
                },
                {
                    name: 'name',
                    label: '字段',
                    type: 'input',
                },
                {
                    name: 'rules',
                    label: '校验',
                    type: 'select',
                    options: [
                        {
                            label: '必填',
                            value: 'required',
                        },
                    ],
                }
            ],
            edit: FormItemEdit,
            preview: FormItemPreview
        },
        Form: {
            name: 'Form',
            defaultProps: {},
            desc: '表单',
            setting: [
                {
                    name: 'title',
                    label: '标题',
                    type: 'input'
                }
            ],
            events: [
                {
                    name: 'onFinish',
                    label: '提交事件'
                }
            ],
            methods: [
                {
                    name: 'submit',
                    label: '提交'
                }
            ],
            edit: FormEdit,
            preview: FormPreview
        },
        Container: {
            name: 'Container',
            defaultProps: {},
            desc: '容器',
            // component: Container
            edit: ContainerEdit,
            preview: ContainerPreview
        },
        Button: {
            name: 'Button',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            setting: [
                {
                    name: 'type',
                    label: '按钮类型',
                    type: 'select',
                    options: [
                        { label: '主按钮', value: 'primary' },
                        { label: '次按钮', value: 'default' },
                    ],
                },
                {
                    name: 'text',
                    label: '文本',
                    type: 'input',
                }
            ],
            styleSetting: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber'
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber'
                }
            ],
            events: [
                {
                    name: 'onClick',
                    label: '点击事件'
                },
                {
                    name: 'onDoubleClick',
                    label: '双击事件'
                },
            ],
            desc: '按钮',
            // component: Button
            edit: ButtonEdit,
            preview: ButtonPreview
        },
        Modal: {
            name: 'Modal',
            defaultProps: {
                title: '弹窗'
            },
            setting: [
                {
                    name: 'title',
                    label: '标题',
                    type: 'input'
                }
            ],
            styleSetting: [],
            events: [
                {
                    name: 'onOk',
                    label: '确认事件',
                },
                {
                    name: 'onCancel',
                    label: '取消事件'
                },
            ],
            methods: [
                {
                    name: 'open',
                    label: '打开弹窗',
                },
                {
                    name: 'close',
                    label: '关闭弹窗'
                },
            ],
            desc: '弹窗',
            edit: ModalEdit,
            preview: ModalPreview
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            desc: '页面',
            // component: Page
            edit: PageEdit,
            preview: PagePreview
        }
    },
    // 注册组件，组件名不能重复
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}));
