import { Link } from "react-router-dom";

interface EditorNavButtonProps {
    to: string;
    icon: React.ReactNode;
    bgColor: string;
}

export const EditorNavButton = ({ to, icon, bgColor }: EditorNavButtonProps) => {
    return (
        <Link to={to}>
            <div className={`border border-white rounded-full p-2 ${bgColor}`}>
                {icon}
            </div>
        </Link>
    )
}