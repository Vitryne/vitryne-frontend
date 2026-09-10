import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  error?: string;
}

const CheckBox: React.FC<Props> = ({
  label,
  error,
  className = "",
  checked,
  onChange,
  id,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className={`w-4 h-4 mt-0.5 rounded border border-border text-primary accent-primary cursor-pointer ${className}`}
          {...rest}
        />
        {label && (
          <span className="font-body text-[13px] leading-snug text-text-primary">
            {label}
          </span>
        )}
      </label>
      {error && (
        <span className="block mt-1 text-[12px] text-danger font-body">
          {error}
        </span>
      )}
    </div>
  );
};

export default CheckBox;
