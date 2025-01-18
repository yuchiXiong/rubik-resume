import classNames from "classnames"
import { ButtonHTMLAttributes } from "react";

export interface IButtonProps {
  children?: string,
  onClick?: () => void,
  className?: string,
  type?: 'primary' | 'secondary',
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
}

const Button = (props: IButtonProps) => {
  const {
    children,
    onClick,
    className,
    type = 'primary',
    htmlType = 'button'
  } = props;

  const styleMap = {
    "secondary": "bg-gray-300 text-white hover:bg-gray-400",
    "primary": "bg-green-500 text-white hover:bg-green-600",
  }

  const basicStyle = 'cursor-pointer px-5 py-2 rounded-md transition-all duration-150'

  return <button
    onClick={onClick}
    type={htmlType}
    className={
      classNames(
        styleMap[type],
        basicStyle,
        className
      )
    }
  >{children}</button>
}

export default Button