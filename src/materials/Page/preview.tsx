import { ICommonComponentProps } from "../interface";

function Page({ children, styles }: ICommonComponentProps) {

    return (
        <div
            style={styles}
            className="p-[20px]"
        >
            {children}
        </div>
    )
}

export default Page;
