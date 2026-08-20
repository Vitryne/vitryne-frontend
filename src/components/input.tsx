import { ReactElement } from "react";

interface Props {
  title?: string;
  icon?: ReactElement;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<Props> = ({icon, title, placeholder, type}) => {
  return (
    <div>
      <label className="block font-body font-semibold uppercase tracking-wider text-[11px] leading-snug text-text-primary mb-1.5">
        {title}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-[10px] border border-border px-4 py-3 pr-10 font-body text-[14px] text-text-primary outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
          {icon}
        </span>
      </div>
    </div>
  );
};

export default Input;
