interface SideBarProps {
    children: React.ReactNode;
}

export const SideBar = ({children}: SideBarProps) => {
    return (
        <div className="flex flex-col justify-start items-center gap-3 border-5 border-border bg-bg w-1/6 h-full p-3 overflow-y-auto">
            {children}
        </div>
    )
}