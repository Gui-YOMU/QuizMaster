import type { RoomRepository } from "../../../domain/ports/RoomRepository";
import type { CreateRoomDto } from "../../dtos/Room/CreateRoomDto";

export class CreateRoom {
  private readonly roomRepository: RoomRepository;
    
      constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository;
      }
    
      async execute(room: CreateRoomDto): Promise<void> {
        return this.roomRepository.createRoom(room);
      }
}
