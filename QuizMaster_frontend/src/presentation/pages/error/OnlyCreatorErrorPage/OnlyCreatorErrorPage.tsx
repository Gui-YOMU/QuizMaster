import { useNavigate } from "react-router";
import { Button } from "../../../components/atoms/Button";
import { ErrorCard } from "../../../components/atoms/ErrorCard";
import { CardTitle } from "../../../components/atoms/CardTitle";
import { Title } from "../../../components/atoms/Title";

export const OnlyCreatorErrorPage = () => {
  const Navigate = useNavigate();

  return (
    <>
      <main className="flex flex-col justify-center items-center gap-10 p-10">
        <ErrorCard>
          <CardTitle content="ERREUR 403" />
          <Title
            color="text-white"
            content="La page que vous recherchez est accessible uniquement aux utilisateurs ayant un statut 'Créateur'."
          />
        </ErrorCard>
        <Button
          content="Retourner au dashboard"
          bgColor="bg-mainblue"
          width="w-fit"
          onClick={() => Navigate("/playerDashboard")}
        />
      </main>
    </>
  );
};
