import { Link } from "react-router-dom";

interface NavButtonProps {
    to: string;
    icon: React.ReactNode;
    bgColor: string;
}

export const NavButton = ({ to, icon, bgColor }: NavButtonProps) => {
    return (
        <Link to={to}>
            <div className={`border border-black rounded-2xl p-1 ${bgColor}`}>
                {icon}
            </div>
        </Link>
    )
}