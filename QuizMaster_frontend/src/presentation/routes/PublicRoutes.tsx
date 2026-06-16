import { AuthLayout } from "../components/templates/AuthLayout/AuthLayout.tsx";
import { LoginPage } from "../pages/auth/LoginPage/LoginPage.tsx";
import { SigninPage } from "../pages/auth/SigninPage/SigninPage.tsx";

export const PublicRoutes = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signin",
        element: <SigninPage />,
      },
    ],
  },
];
