import { Link } from "react-router";
import { Button } from "../../../components/atoms/Button";
import { CardTitle } from "../../../components/atoms/CardTitle";
import { Card } from "../../../components/atoms/Card";
import { FormItem } from "../../../components/molecules/FormItem";
import { usePlayerDashboardPageViewModel } from "./usePlayerDashboardPageViewModel";

export const PlayerDashboardPage = () => {
  const vm = usePlayerDashboardPageViewModel();

  return (
    <>
      {vm.isPending && <span>Loading ...</span>}
      {vm.isError && <span>Erreur !</span>}
      {vm.user && (
        <div className="h-full flex justify-around items-center">
          <Card bgColor="bg-mainpurple" width="w-9/20" height="h-1/2">
            <CardTitle content="Participer à un quiz" />
            <form
              className="h-1/2 flex flex-col justify-between"
              onSubmit={vm.onSubmit}
            >
              <FormItem
                color="text-white"
                name="roomCode"
                type="text"
                placeholder="Ex : 1234567"
                content="Code de la salle"
                mandatory={true}
                onChange={(e) => vm.setRoomCode(e.target.value)}
              />
              <Button
                content="Rejoindre la salle"
                bgColor="bg-mainblue"
                width="w-fit"
              />
            </form>
          </Card>
          <Card bgColor="bg-maingold" width="w-9/20" height="h-1/2">
            <CardTitle content="Nombre de quiz joués" />
            <div className="h-1/2 flex flex-col justify-between">
              <p className="text-6xl text-white font-bold mx-auto">
                {vm.user.roomIds.length}
              </p>
              <Link to={"/playerStats"}>
                <Button
                  content="Accéder à mes stats"
                  bgColor="bg-mainblue"
                  width="w-fit"
                />
              </Link>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
