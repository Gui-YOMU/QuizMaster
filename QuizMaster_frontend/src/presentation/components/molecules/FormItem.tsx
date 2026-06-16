import { Input } from "../atoms/Input.tsx";
import { Label } from "../atoms/Label.tsx";

interface FormItemProps {
  color: string;
  name: string;
  content: string;
  type: string;
  placeholder: string;
  value?: string | number;
  min?: number;
  mandatory?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormItem = ({ color, name, content, type, placeholder, value, min, mandatory, onChange }: FormItemProps) => {
  return (
    <div className="flex flex-col">
      <Label color={color} htmlFor={name} content={content} mandatory={mandatory} />
      <Input
        type={type}
        name={name}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}