import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { UserQueries } from "../../../../core/infrastructure/queries/UserQueries";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useUserProfilePageViewModel() {
  const { userId } = useAuth();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");

  const Navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery(
    UserQueries.findUserById(userId ? parseInt(userId) : 0),
  );

  useEffect(() => {
    if (data) {
      setLastName(data.lastName);
      setFirstName(data.firstName);
      setSurname(data.surname ?? "");
    }
    if (isError) {
      toast.error(error.message);
    }
  }, [data, isError, error]);

  const updateUserMutation = UserQueries.updateUser();
  const deleteUserMutation = UserQueries.deleteUser();

  const updateMutation = useMutation({
    ...updateUserMutation,
    onSuccess: () => {
      console.log("Profil modifié !");
      toast.success("Votre profil a bien été mis à jour.");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    ...deleteUserMutation,
    onSuccess: () => {
      console.log("Profil supprimé !");
      toast.success("Votre profil a bien été supprimé.");
      Navigate("/login");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate({
      id: userId ? parseInt(userId) : 0,
      user: {
        lastName: lastName.trim().length !== 0 ? lastName : undefined,
        firstName: firstName.trim().length !== 0 ? firstName : undefined,
        surname: surname.trim().length !== 0 ? surname : undefined,
      },
    });
    console.log(`Modifications enregistrées.`);
  };

  const onDelete = () => {
    deleteMutation.mutate(userId ? parseInt(userId) : 0);
    console.log("Profil supprimé.");
  };

  const onResetCredentials = () => {
    console.log("Identifiants modifiés.");
  };

  const onSubscribe = () => {
    console.log("Je suis abonné.");
  };

  return {
    isPending,
    isError,
    error,
    user: data,
    lastName,
    firstName,
    surname,
    setLastName,
    setFirstName,
    setSurname,
    onSubmit,
    onDelete,
    onResetCredentials,
    onSubscribe,
  };
}
