import type { ReactElement } from "react"
interface ButtonInterface {
    content: string,
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    icon?: ReactElement,
    onClick?: () => void
}
const variants = {
    primary: "bg-dark-blue text-white hover:bg-dark-blue-hover",
    secondary: "bg-light-blue text-dark-blue hover:bg-light-blue-hover"
}
const defaultStyles = {
    default: "px-5 py-4  rounded-3xl m-3 flex gap-2 text-xl items-center w-50 cursor-pointer flex justify-center item-center"
}
const Button = (props: ButtonInterface) => {
    return (
        <>
            <div onClick={props.onClick} className={`${defaultStyles.default} ${props.size} ${variants[props.variant]}`}>
                <div>{props.icon}</div>
                <button>{props.content}</button>
            </div>
        </>
    )
}
export default Button