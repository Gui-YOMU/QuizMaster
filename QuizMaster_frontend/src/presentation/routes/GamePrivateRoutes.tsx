import { GameLayout } from "../components/templates/GameLayout/GameLayout";
import { ProtectedRoute } from "./ProtectedRoute";

export const GamePrivateRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <GameLayout />,
        children: [
          // {
          //   path: "",
          //   element: ,
          // },
        ],
      },
    ],
  },
];
