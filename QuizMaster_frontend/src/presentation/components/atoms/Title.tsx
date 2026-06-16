interface TitleProps {
  content: string;
  color: string;
}

export const Title = ({ content, color }: TitleProps) => {
  return (
    <h1 className={`font-bold text-3xl ${color}`}>
      {content}
    </h1>
  );
}