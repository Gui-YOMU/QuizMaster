import { Button } from "../atoms/Button.tsx";
import { Input } from "../atoms/Input.tsx";

interface UpdateFormProps {
  lastName: string;
  firstName: string;
  surname: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export const UpdateForm = ({
  lastName,
  firstName,
  surname,
  setLastName,
  setFirstName,
  setSurname,
  onSubmit,
}: UpdateFormProps) => {
  return (
    <>
      <form className="w-9/10 lg:h-1/2 flex flex-col justify-center gap-3 items-center" onSubmit={onSubmit}>
        <div className="flex justify-around w-full flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-1/3">
            <Input
              value={lastName}
              name="lastName"
              type="text"
              placeholder="Ex : DUPONT"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="w-full lg:w-1/3">
            <Input
              value={firstName}
              name="firstName"
              type="text"
              placeholder="Ex : Martin"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <Input
            value={surname}
            name="surname"
            type="text"
            placeholder="Votre pseudo"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <Button
          content="Enregistrer les modifications"
          bgColor="bg-mainblue"
          width="w-full lg:w-1/3"
        />
      </form>
    </>
  );
};
