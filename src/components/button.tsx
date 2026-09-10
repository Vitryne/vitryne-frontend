import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: "primary" | "secondary" | "outline";
  children?: ReactNode;
}

const Button: React.FC<Props> = ({
  title,
  children,
  variant = "primary",
  type = "submit",
  disabled,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "w-full rounded-[10px] font-body font-semibold text-[14px] py-3.5 px-4 transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-center gap-2";

  const variantStyles = {
    primary:
      "bg-primary hover:bg-primary-hover text-white hover:scale-[1.01] active:scale-98 shadow-sm",
    secondary:
      "bg-primary-soft hover:bg-purple-100 text-primary hover:scale-[1.01] active:scale-98",
    outline:
      "bg-transparent border border-border hover:bg-gray-50 text-text-primary active:scale-98",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      {...rest}
    >
      {title || children}
    </button>
  );
};

export default Button;