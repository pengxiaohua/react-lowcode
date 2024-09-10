import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button'

export interface IButton {
    type: ButtonType;
    text: string;
}

const Button = ({ type, text }: IButton) => {
    return <AntdButton type={type}>{text}</AntdButton>;
};

export default Button;