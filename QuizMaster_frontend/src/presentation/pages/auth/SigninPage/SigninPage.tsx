import { SigninForm } from "../../../components/organisms/SigninForm.tsx";
import { Link } from "react-router-dom";
import { useSigninPageViewModel } from "./useSigninPageViewModel.tsx";

export const SigninPage = () => {
  const vm = useSigninPageViewModel();

  return (
    <>
      <SigninForm
        setLastName={vm.setLastName}
        setFirstName={vm.setFirstName}
        setSurname={vm.setSurname}
        setMail={vm.setMail}
        setPassword={vm.setPassword}
        setConfirmPassword={vm.setConfirmPassword}
        onSubmit={vm.onSubmit}
      />
      <p>Déjà inscrit ?</p>
      <p>
        Cliquez{" "}
        <Link className="font-bold" to="/login">
          ici
        </Link>{" "}
        pour vous connecter
      </p>
    </>
  );
};
