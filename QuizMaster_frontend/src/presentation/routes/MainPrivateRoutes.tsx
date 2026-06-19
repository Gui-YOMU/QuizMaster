import { MainLayout } from "../components/templates/MainLayout/MainLayout.tsx";
import { LogoutPage } from "../pages/auth/LogoutPage/LogOutPage.tsx";
import { PlayerDashboardPage } from "../pages/main/PlayerDashboardPage/PlayerDashboardPage.tsx";
import { PlayerStatsPage } from "../pages/main/PlayerStatsPage/PlayerStatsPage.tsx";
import { UserProfilePage } from "../pages/main/UserProfilePage/UserProfilePage.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

export const MainPrivateRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/playerDashboard",
            element: <PlayerDashboardPage />,
          },
          {
            path: "/profile",
            element: <UserProfilePage />,
          },
          {
            path: "/logout",
            element: <LogoutPage />,
          },
          {
            path: "/playerStats",
            element: <PlayerStatsPage />,
          },
        ],
      },
    ],
  },
];
