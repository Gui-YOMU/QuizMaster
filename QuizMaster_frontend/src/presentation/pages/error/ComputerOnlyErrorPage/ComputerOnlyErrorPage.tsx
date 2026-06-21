import { useNavigate } from "react-router";
import { Button } from "../../../components/atoms/Button";
import { ErrorCard } from "../../../components/atoms/ErrorCard";
import { CardTitle } from "../../../components/atoms/CardTitle";
import { Title } from "../../../components/atoms/Title";

export const ComputerOnlyErrorPage = () => {
  const Navigate = useNavigate();

  return (
    <>
      <main className="flex flex-col justify-center items-center gap-10 p-10">
        <ErrorCard>
          <CardTitle content="ERREUR 409" />
          <Title
            color="text-white"
            content="Pour des raisons pratiques, la page que vous recherchez n'est affichable que sur un écran large (>1024 px)."
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
