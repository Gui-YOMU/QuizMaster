interface ButtonProps {
  bgColor: string;
  icon?: React.ReactNode;
  content: string;
  width: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  opacity?: string; 
}

export const Button = ({ bgColor, icon, content, width, onClick, opacity }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${opacity} border border-white text-white p-2 rounded-lg font-semibold ${width} mx-auto flex justify-center items-center gap-3 text-md lg:text-lg`}
    >
      {icon}
      {content}
    </button>
  );
};
