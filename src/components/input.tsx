import { ReactElement, InputHTMLAttributes } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  title?: string;
  icon?: ReactElement;
  error?: string;
  containerClassName?: string;
}

const Input: React.FC<Props> = ({
  icon,
  title,
  placeholder,
  type = "text",
  error,
  className = "",
  containerClassName = "",
  ...rest
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {title && (
        <label className="block font-body font-semibold uppercase tracking-wider text-[11px] leading-snug text-text-primary mb-1.5">
          {title}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-[10px] border ${
            error ? "border-danger focus:border-danger" : "border-border focus:border-primary"
          } px-4 py-3 ${
            icon ? "pr-10" : "pr-4"
          } font-body text-[14px] text-text-primary outline-none transition-colors duration-150 bg-white ${className}`}
          {...rest}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <span className="block mt-1 font-body text-[12px] text-danger">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
