import { Button as AntdButton } from 'antd';

import { ICommonComponentProps } from './interface';

const Button = ({ id, type, text }: ICommonComponentProps) => {
    return <AntdButton data-component-id={id} type={type}>{text}</AntdButton>;
};

export default Button;