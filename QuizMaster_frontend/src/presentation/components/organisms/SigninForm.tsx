import { Title } from "../atoms/Title.tsx";
import { FormItem } from "../molecules/FormItem.tsx";
import { Button } from "../atoms/Button.tsx";

interface SigninFormProps {
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  setMail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export const SigninForm = ({setLastName, setFirstName, setSurname, setMail, setPassword, setConfirmPassword, onSubmit}: SigninFormProps) => {
  
  return (
    <>
      <Title content="Page d'inscription" color="text-black"/>
      <div className="bg-bg p-3.5 w-9/10 md:w-2/3 lg:w-1/2 border border-border rounded-lg flex flex-col gap-5 justify-center items-center">
        <form className="w-full lg:w-3/4 flex flex-col gap-3" onSubmit={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-3 justify-between">
            <FormItem
            color="text-black"
              name="lastName"
              type="text"
              placeholder="Ex : DUPONT"
              content="Nom"
              mandatory={true}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormItem
            color="text-black"
              name="firstName"
              type="text"
              placeholder="Ex : Martin"
              content="Prénom"
              mandatory={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <FormItem
          color="text-black"
            name="surname"
            type="text"
            placeholder="Votre pseudo"
            content="Pseudo"
            mandatory={false}
            onChange={(e) => setSurname(e.target.value)}
          />
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
          <FormItem
          color="text-black"
            name="confirmPassword"
            type="password"
            placeholder="Entrez à nouveau le mot de passe"
            content="Confirmer le mot de passe"
            mandatory={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button content="S'inscrire" bgColor="bg-mainblue" width="w-1/3 lg:w-4/6" />
        </form>
      </div>
    </>
  );
};
