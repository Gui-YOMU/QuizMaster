interface LabelProps {
    htmlFor: string;
    content: string;
    mandatory?: boolean;
    color: string;
}

export const Label = ({ htmlFor, content, mandatory, color }: LabelProps) => {
  return (
    <label className={`${color}`} htmlFor={htmlFor}>
      {content}
      {mandatory && <span className="text-error font-bold"> *</span>}
    </label>
  );
}