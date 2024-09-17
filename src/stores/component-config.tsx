import { create } from 'zustand';
import Container from '../materials/Container';
import Button from '../materials/Button';
import Page from '../materials/Page';

export interface IComponentSetting {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}

export interface IComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    desc: string;
    setting?: IComponentSetting[];
    styleSetting?: IComponentSetting[];
    component: any;
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
            component: Container
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
            desc: '按钮',
            component: Button
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            desc: '页面',
            component: Page
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
