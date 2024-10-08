import { useDrop } from 'react-dnd';

import { getComponentById, useComponentsStore } from '../stores/components';
import { useComponentConfigStore } from '../stores/component-config';

interface IItemType {
  type: string;
  dragType?: 'move' | 'add';
  id: number;
}

const useMaterialsDrop = (accept: string[], id: number) => {
  const { addComponent, components, removeComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: IItemType, monitor) => {
      // 当组件被拖拽后，如果组件被放置到了该区域，则执行该方法
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      if (item.dragType === 'move') {
        const component = getComponentById(item.id, components)!;

        removeComponent(item.id);

        addComponent(component, id);
      } else {
        const config = componentConfig[item.type];

        addComponent(
          {
            id: new Date().getTime(),
            name: item.type,
            desc: config.desc,
            props: config.defaultProps,
            styles: {
              // background: 'green',
            },
          },
          id
        );
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, drop };
};

export default useMaterialsDrop;
