import { create } from 'zustand';

export interface IComponent {
    id: number;
    name: string;
    props: any;
    children?: IComponent[];
    parentId?: number;
}

interface IState {
    components: IComponent[];
    currentComponentId: number | null;
    currentComponent: IComponent | null;
}

interface IAction {
    addComponent: (component: IComponent, parentId: number) => void;
    removeComponent: (componentId: number) => void;
    updateComponent: (componentId: number, props: any) => void;
    setCurrentComponent: (componentId: number) => void;
}

export const useComponentsStore = create<IState & IAction>(
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
        setCurrentComponent: (componentId) => {

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
            })
    })
);


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