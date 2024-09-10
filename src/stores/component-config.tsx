import { create } from 'zustand';
import Container from '../materials/Container';
import Button from '../materials/Button';
import Page from '../materials/Page';

export interface IComponentConfig {
    name: string;
    defaultProps: Record<string, any>,
    component: any
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
            component: Container
        },
        Button: {
            name: 'Button',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            component: Button
        },
        Page: {
            name: 'Page',
            defaultProps: {},
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
