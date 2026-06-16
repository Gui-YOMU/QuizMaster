interface IconButtonProps {
  onClick: (args: any) => void;
  icon: React.ReactNode;
  bgColor: string;
  value?: number;
  border: boolean;
}

export const IconButton = ({ onClick, icon, bgColor, border }: IconButtonProps) => {
  return (
    <button
        onClick={onClick}
        type="button"
        className={`${border ? "border" : ""} border-white rounded-full p-2 ${bgColor}`}
      >
        {icon}
      </button>
  );
};
