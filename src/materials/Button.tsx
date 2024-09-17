import { Button as AntdButton } from 'antd';

import { ICommonComponentProps } from './interface';

const Button = ({ id, type, text, styles }: ICommonComponentProps) => {
    return <AntdButton data-component-id={id} type={type} style={styles}>{text}</AntdButton>;
};

export default Button;