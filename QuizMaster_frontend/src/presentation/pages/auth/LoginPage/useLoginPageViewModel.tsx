import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { UserQueries } from "../../../../core/infrastructure/queries/UserQueries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useLoginPageViewModel() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const { login } = useAuth();

  const logUserMutation = UserQueries.findUserByMail();

  const mutation = useMutation({
    ...logUserMutation,
    onSuccess: (data) => {
      console.log("Connexion réussie !");
      toast.success("Connecté avec succès.");
      if (data.length > 0) {
        login(data[0], data[1]);
        Navigate("/playerDashboard");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      mail,
      password,
    });
  };

  return {
    setMail,
    setPassword,
    onSubmit,
  };
}
