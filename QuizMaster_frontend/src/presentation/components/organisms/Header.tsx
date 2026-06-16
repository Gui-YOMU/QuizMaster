import { Logo } from '../atoms/Logo.tsx'

export const Header = () => {
    return (
        <header className="flex justify-center p-2.5 w-full bg-mainblue h-37.5">
            <Logo />
        </header>
    )
}