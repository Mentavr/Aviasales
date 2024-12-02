import clsx from "clsx";
import cls from "./style.module.scss";

interface IButton {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  text,
  onClick,
  type = "button",
  className,
  disabled = false,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      className={clsx(cls.button, className)}
      type={type}
      disabled={disabled}
    >
      <span className={cls.button__text}>{text}</span>
    </button>
  );
};
