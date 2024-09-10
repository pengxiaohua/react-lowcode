import { useDrop } from 'react-dnd';

import { useComponentsStore } from '../stores/components';
import { useComponentConfigStore } from '../stores/component-config';

const useMaterialsDrop = (accept: string[], id: number) => {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      // 当组件被拖拽后，如果组件被放置到了该区域，则执行该方法
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const props = componentConfig[item.type].defaultProps;

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, drop };
};

export default useMaterialsDrop;
