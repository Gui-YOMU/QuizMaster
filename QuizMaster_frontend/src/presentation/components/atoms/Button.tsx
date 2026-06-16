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
      className={`${bgColor} text-white p-2 rounded-lg font-semibold ${width} mx-auto flex justify-center items-center gap-3`}
    >
      {icon}
      {content}
    </button>
  );
};
