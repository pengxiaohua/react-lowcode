import { create } from 'zustand';
import ContainerEdit from '../materials/ContainerEdit';
import ContainerPreview from '../materials/ContainerPreview';
import ButtonEdit from '../materials/ButtonEdit';
import ButtonPreview from '../materials/ButtonPreview';
import PageEdit from '../materials/PageEdit';
import PagePreview from '../materials/PagePreview';

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
