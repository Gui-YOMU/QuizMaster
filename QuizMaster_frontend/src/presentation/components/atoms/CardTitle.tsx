interface CardTitleProps {
  content: string;
}

export const CardTitle = ({ content }: CardTitleProps) => {
  return (
    <h1 className="font-bold text-lg lg:text-3xl bg-bg rounded-xl p-2 lg:p-3 text-center h-fit">{content}</h1>
  );
};
