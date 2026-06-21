interface CardProps {
    children: React.ReactNode;
}

export const ErrorCard = ({ children }: CardProps) => {
  return <div className={`bg-error rounded-xl flex flex-col justify-center gap-10 items-center p-10`}>{children}</div>;
};
