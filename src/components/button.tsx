interface Props{
    title?: string;
    className?: string;
}

const Button: React.FC<Props> = ({title}) => {
    return(
        <button
              type="submit"
              className="w-full rounded-[10px] bg-primary hover:bg-primary-hover text-white font-body font-semibold text-[14px] py-3.5 transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"
            >
              {title}
        </button>
    )
}

export default Button;