import { useNavigate } from "react-router";
import { Button } from "../../../components/atoms/Button";
import { Header } from "../../../components/organisms/Header";
import { CardTitle } from "../../../components/atoms/CardTitle";
import { Title } from "../../../components/atoms/Title";
import { ErrorCard } from "../../../components/atoms/ErrorCard";

export const NotFoundErrorPage = () => {
  const Navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center gap-10 p-10">
        <ErrorCard>
          <CardTitle content="ERREUR 404" />
          <Title color="text-white" content="La page que vous recherchez est introuvable." />
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
