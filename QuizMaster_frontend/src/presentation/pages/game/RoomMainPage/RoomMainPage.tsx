import { useParams } from "react-router";
import { useGame } from "../../../contexts/GameContext";
import { useState } from "react";
import { Card } from "../../../components/atoms/Card";

export const RoomMainPage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();

  const { socket } = useGame();

  const [playersList, setPlayersList] = useState<{id: number; name: string; score: number }[]>([]);

  socket?.on("players-list", (playersList) => {
    setPlayersList(playersList);
  });

  return (
    <div>
      <h1>Accueil de la salle</h1>
      <div>{`Code de la salle : ${roomCode}`}</div>
      <h2>Liste des joueurs : </h2>
      <div>{playersList.map((player) => (
        <Card bgColor="bg-mainblue" width="w-50" height="h-50">
            <p>{player.name}</p>
        </Card>
      ))}</div>
    </div>
  );
};
