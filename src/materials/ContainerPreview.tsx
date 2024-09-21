import { ICommonComponentProps } from "./interface";

const Container = ({ children, styles }: ICommonComponentProps) => {

    return (
        <div
            style={styles}
            className="p-[20px]"
        >
            {children}
        </div>
    )
};

export default Container;
