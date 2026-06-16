interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    value?: string | number;
    min?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ type, name, placeholder, value, min, onChange }: InputProps) => {
    return (
        <input className={`bg-card border border-border rounded-lg pt-1 pb-1 pr-4 pl-4 w-full`} type={type} id={name} name={name} value={value} min={min} placeholder={placeholder} onChange={onChange}/>
    )
}