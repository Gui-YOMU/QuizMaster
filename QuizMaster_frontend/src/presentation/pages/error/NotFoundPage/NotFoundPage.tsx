import { useNavigate } from "react-router";
import { Button } from "../../../components/atoms/Button"

export const NotFoundPage = () => {
    const Navigate = useNavigate();

    return (
        <div>
            <h1>Page non trouvée</h1>
            <h2>Erreur 404</h2>
            <Button
                content="Retourner au dashboard"
                bgColor="bg-mainblue"
                width="w-fit"
                onClick={() => Navigate("/playerDashboard")}/>
        </div>
    )
}