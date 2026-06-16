export type Player = { id: number; name: string; score: number };

export type Room = {
  host: string;
  hostId: number;
  quizId: number;
  players: Player[];
};

export const rooms: Record<string, Room> = {};
