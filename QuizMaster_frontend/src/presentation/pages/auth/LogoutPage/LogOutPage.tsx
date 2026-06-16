import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";

export const LogoutPage = () => {
  const { logout } = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    logout();
    Navigate("/login");
  }, []);

  return null;
};
