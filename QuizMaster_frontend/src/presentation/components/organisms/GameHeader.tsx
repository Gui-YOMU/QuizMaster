import {Title} from "../atoms/Title.tsx";
import {Icon} from "../atoms/Icon.tsx";

interface GameHeaderProps {

}

export const GameHeader = ({}: GameHeaderProps) => {
    return (
        <header className="flex justify-between items-center p-2.5 w-full bg-mainblue h-37.5">
            <Icon />
            {/* {isPending && <span>Loading...</span>} */}
            <Title content={"Numéro de la salle"} color="text-white" />
        </header>
    )
}