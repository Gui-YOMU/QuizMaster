interface CardProps {
    children: React.ReactNode;
    bgColor: string;
    width: string;
    height: string;
}

export const Card = ({ children, bgColor, width, height }: CardProps) => {
  return <div className={`${bgColor} ${width} ${height} rounded-xl flex flex-col justify-center gap-3 items-center py-3 px-5`}>{children}</div>;
};
