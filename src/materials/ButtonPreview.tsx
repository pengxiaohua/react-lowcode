import { Button as AntdButton } from 'antd';

import { ICommonComponentProps } from './interface';

const Button = ({ id, type, text, styles, ...props }: ICommonComponentProps) => {
    return <AntdButton type={type} style={styles} {...props}>{text}</AntdButton>;
};

export default Button;