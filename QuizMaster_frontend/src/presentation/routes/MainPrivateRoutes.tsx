import { MainLayout } from "../components/templates/MainLayout/MainLayout.tsx";
import { CreatorDashboardPage } from "../pages/main/CreatorDashboardPage/CreatorDashboardPage.tsx";
import { CreatorStatsPage } from "../pages/main/CreatorStatsPage/CreatorStatsPage.tsx";
import { LogoutPage } from "../pages/auth/LogoutPage/LogOutPage.tsx";
import { PlayerDashboardPage } from "../pages/main/PlayerDashboardPage/PlayerDashboardPage.tsx";
import { PlayerStatsPage } from "../pages/main/PlayerStatsPage/PlayerStatsPage.tsx";
import { QuizListPage } from "../pages/main/QuizListPage/QuizListPage.tsx";
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
            path: "/creatorDashboard",
            element: <CreatorDashboardPage />,
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
            path: "/allQuiz",
            element: <QuizListPage />,
          },
          {
            path: "/playerStats",
            element: <PlayerStatsPage />,
          },
          {
            path: "/creatorStats",
            element: <CreatorStatsPage />,
          },
        ],
      },
    ],
  },
];
