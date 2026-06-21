interface TitleProps {
  content: string;
  color: string;
}

export const Title = ({ content, color }: TitleProps) => {
  return (
    <h1 className={`font-bold text-xl lg:text-3xl ${color} text-center`}>
      {content}
    </h1>
  );
}