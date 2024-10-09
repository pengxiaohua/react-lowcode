import { CSSProperties } from 'react';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IComponent {
    id: number;
    name: string;
    props: any;
    desc: string;
    styles?: CSSProperties
    children?: IComponent[];
    parentId?: number;
}

interface IState {
    components: IComponent[];
    mode: 'edit' | 'preview';
    currentComponentId: number | null;
    currentComponent: IComponent | null;
}

interface IAction {
    addComponent: (component: IComponent, parentId: number) => void;
    removeComponent: (componentId: number | null) => void;
    updateComponent: (componentId: number, props: any) => void;
    updateStyles: (componentId: number, styles: CSSProperties, replace?: boolean) => void;
    setCurrentComponentId: (componentId: number | null) => void;
    setMode: (mode: IState['mode']) => void;
}

const creator: StateCreator<IState & IAction> =
    (set, get) => ({
        components: [
            {
                id: 1,
                name: 'Page',
                props: {},
                desc: '页面'
            }
        ],
        currentComponent: null,
        currentComponentId: null,
        mode: 'edit',
        setMode: (mode) => set({ mode }),
        setCurrentComponentId: (componentId) => {
            set((state) => ({
                currentComponentId: componentId,
                currentComponent: getComponentById(componentId, state.components)
            }))
        },
        addComponent: (component, parentId) =>
            set((state) => {
                if (parentId) {
                    const parentComponent = getComponentById(parentId, state.components);

                    if (parentComponent) {
                        if (parentComponent.children) {
                            parentComponent.children.push(component);
                        } else {
                            parentComponent.children = [component];
                        }
                    }

                    component.parentId = parentId;
                    return { components: [...state.components] }
                }
                return { components: [...state.components, component] };
            }),
        removeComponent: (componentId) => {
            if (!componentId) return;

            const component = getComponentById(componentId, get().components);

            if (component?.parentId) {
                const parentComponent = getComponentById(component.parentId, get().components);

                if (parentComponent) {
                    parentComponent.children = parentComponent?.children?.filter(
                        (child) => child.id !== +componentId
                    );

                    set({ components: [...get().components] });
                }
            }
        },
        updateComponent: (componentId, props) =>
            set((state) => {
                const component = getComponentById(componentId, state.components);

                if (component) {
                    component.props = { ...component.props, ...props };

                    return { components: [...state.components] };
                }

                return { components: [...state.components] };
            }),
        updateStyles: (componentId, styles, replace) =>
            set((state) => {
                const component = getComponentById(componentId, state.components);

                if (component) {
                    component.styles = replace ? { ...styles } : { ...component.styles, ...styles };

                    return { components: [...state.components] };
                }

                return { components: [...state.components] };
            }),
    })

export const useComponentsStore = create<IState & IAction>()(persist(creator, {
    name: 'storage-components',
    partialize: (state) => {
        // 过滤掉 currentComponentId
        const { currentComponentId, ...restState } = state;
        return restState;
    }
}));


/**
 * 根据组件ID 递归获取组件
 *
 * @param id 组件ID
 * @param components 组件数组
 * @returns 返回找到的组件，若未找到则返回null
 */
export function getComponentById(
    id: number | null,
    components: IComponent[]
): IComponent | null {
    if (!id) return null;

    for (const component of components) {
        if (component.id == id) return component;
        if (component.children && component.children.length > 0) {
            const result = getComponentById(id, component.children);
            if (result !== null) return result;
        }
    }
    return null;
}