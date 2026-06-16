import { GameLayout } from "../components/templates/GameLayout/GameLayout";
import { RoomMainPage } from "../pages/game/RoomMainPage/RoomMainPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const GamePrivateRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <GameLayout />,
        children: [
          {
            path: "/roomMain/:roomCode",
            element: <RoomMainPage />,
          },
        ],
      },
    ],
  },
];
