import { Button } from "../../../components/atoms/Button";
import { CardTitle } from "../../../components/atoms/CardTitle";
import { Card } from "../../../components/atoms/Card";
import { UpdateForm } from "../../../components/organisms/UpdateForm";
import { useUserProfilePageViewModel } from "./useUserProfilePageViewModel";

export const UserProfilePage = () => {
  const vm = useUserProfilePageViewModel();

  return (
    <>
      {vm.isPending && <span>Loading ...</span>}
      {vm.isError && <span>Erreur !</span>}
      {vm.user && (
        <div className="h-full flex flex-col justify-around items-center">
          <Card bgColor="bg-mainpurple" width="w-4/5" height="h-1/2">
            <CardTitle content="Vos informations" />
            <UpdateForm
              lastName={vm.lastName}
              firstName={vm.firstName}
              surname={vm.surname ? vm.surname : ""}
              setLastName={vm.setLastName}
              setFirstName={vm.setFirstName}
              setSurname={vm.setSurname}
              onSubmit={vm.onSubmit}
            />
            <div className="w-9/10 flex flex-col lg:pb-5 lg:flex-row gap-3">
              <Button
                content="Modifier les identifiants"
                bgColor="bg-maingold"
                width="w-full lg:w-1/3"
                onClick={vm.onResetCredentials}
              />
              <Button
                content="Supprimer son profil"
                bgColor="bg-error"
                width="w-full lg:w-1/3"
                onClick={vm.onDelete}
              />
            </div>
          </Card>
          <Card bgColor="bg-maingold" width="w-4/5 lg:w-2/5" height="h-1/5">
            <CardTitle content="Envie de créer vos propres quiz ?" />
            <Button
              content="S'abonner"
              bgColor="bg-mainblue"
              width="w-fit"
              onClick={vm.onSubscribe}
            />
          </Card>
        </div>
      )}
    </>
  );
};
