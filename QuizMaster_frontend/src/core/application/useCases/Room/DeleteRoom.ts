import type { RoomRepository } from "../../../domain/ports/RoomRepository";

export class DeleteRoom {
  private readonly roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(id: number): Promise<void> {
    return this.roomRepository.deleteRoom(id);
  }
}
