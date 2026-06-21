import { Title } from "../atoms/Title.tsx";
import { FormItem } from "../molecules/FormItem.tsx";
import { Button } from "../atoms/Button.tsx";

interface LoginFormProps {
  setMail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({
  setMail,
  setPassword,
  onSubmit,
}: LoginFormProps) => {
  return (
    <>
      <Title content="Page de connexion" color="text-black"/>
      <div className="bg-bg p-3.5 w-9/10 lg:w-1/2 border border-border rounded-lg flex flex-col gap-5 justify-center items-center">
        <form className="w-full lg:w-1/2 flex flex-col gap-5" onSubmit={onSubmit}>
          <FormItem
          color="text-black"
            name="mail"
            type="mail"
            placeholder="Ex : dupont.martin@gmail.com"
            content="Email"
            mandatory={true}
            onChange={(e) => setMail(e.target.value)}
          />
          <FormItem
          color="text-black"
            name="password"
            type="password"
            placeholder="12+ majuscule, minuscule, chiffre et caractère spécial"
            content="Mot de passe"
            mandatory={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button content="Se connecter" bgColor="bg-mainblue" width="w-1/3 lg:w-5/6" />
        </form>
      </div>
    </>
  );
};
