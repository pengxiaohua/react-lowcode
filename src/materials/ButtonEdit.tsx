import { Button as AntdButton } from 'antd';
import { useDrag } from 'react-dnd';

import { ICommonComponentProps } from './interface';

const Button = ({ id, type, text, styles }: ICommonComponentProps) => {
    const [_, drag] = useDrag({
        type: 'Button',
        item: {
            id,
            type: 'Button',
            dragType: 'move'
        },
    })

    return <AntdButton ref={drag} data-component-id={id} type={type} style={styles}>{text}</AntdButton>;
};

export default Button;