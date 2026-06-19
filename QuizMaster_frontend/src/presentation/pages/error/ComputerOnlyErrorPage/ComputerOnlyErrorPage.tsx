import { useNavigate } from "react-router";
import { Button } from "../../../components/atoms/Button"

export const ComputerOnlyErrorPage = () => {
    const Navigate = useNavigate();

    return (
        <div>
            <h1>Page indisponible</h1>
            <h2>Erreur 409</h2>
            <Button
                content="Retourner au dashboard"
                bgColor="bg-mainblue"
                width="w-fit"
                onClick={() => Navigate("/playerDashboard")}/>
        </div>
    )
}