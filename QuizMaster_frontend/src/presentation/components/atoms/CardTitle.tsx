interface CardTitleProps {
  content: string;
}

export const CardTitle = ({ content }: CardTitleProps) => {
  return (
    <h1 className="font-bold text-3xl bg-bg rounded-xl p-3">{content}</h1>
  );
};
