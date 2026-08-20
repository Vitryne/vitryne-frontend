import { ReactElement } from "react";

interface Props {
  title?: string;
  icon?: ReactElement;
}

const ButtonGoogle: React.FC<Props> = ({ title, icon }) => {
  return (
    <button className="w-full flex items-center justify-center gap-3 rounded-[10px] border border-border py-3.5 font-body font-semibold text-[14px] text-text-primary">
      {icon}
      {title}
    </button>
  );
};

export default ButtonGoogle;
