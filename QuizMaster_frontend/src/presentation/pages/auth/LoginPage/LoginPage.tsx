import { LoginForm } from "../../../components/organisms/LoginForm.tsx";
import { Link } from "react-router-dom";
import { useLoginPageViewModel } from "./useLoginPageViewModel.tsx";

export const LoginPage = () => {
  const vm = useLoginPageViewModel();

  return (
    <>
      <LoginForm
        setMail={vm.setMail}
        setPassword={vm.setPassword}
        onSubmit={vm.onSubmit}
      />
      <p>Pas encore inscrit ?</p>
      <p>
        Cliquez{" "}
        <Link className="font-bold" to="/signin">
          ici
        </Link>{" "}
        pour vous inscrire
      </p>
    </>
  );
};
