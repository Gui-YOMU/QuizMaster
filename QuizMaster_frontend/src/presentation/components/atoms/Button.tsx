interface ButtonProps {
  bgColor: string;
  icon?: React.ReactNode;
  content: string;
  width: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
}

export const Button = ({ bgColor, icon, content, width, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} border border-white text-white p-2 rounded-lg font-semibold ${width} mx-auto flex justify-center items-center gap-3 text-sm lg:text-md`}
    >
      {icon}
      {content}
    </button>
  );
};
