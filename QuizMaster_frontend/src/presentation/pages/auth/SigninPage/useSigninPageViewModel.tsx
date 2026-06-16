import { useState } from "react";
import { useNavigate } from "react-router";
import { UserQueries } from "../../../../core/infrastructure/queries/UserQueries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useSigninPageViewModel() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Navigate = useNavigate();

  const createUserMutation = UserQueries.createUser();

  const mutation = useMutation({
    ...createUserMutation,
    onSuccess: () => {
      console.log("Inscription réussie !");
      toast.success("Votre profil a bien été créé.");
      Navigate("/login");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      toast.error("Les mots de passe ne correspondent pas.", {});
      return;
    }

    mutation.mutate({
      lastName,
      firstName,
      surname: surname.trim().length !== 0 ? surname : undefined,
      mail,
      password,
      confirmPassword,
    });
  };

  return {
    setLastName,
    setFirstName,
    setSurname,
    setMail,
    setPassword,
    setConfirmPassword,
    onSubmit,
  };
}
