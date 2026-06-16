import type { ItemRepository } from "../../../domain/ports/ItemRepository";
import type { UpdateItemDto } from "../../dtos/Item/UpdateItemDto";

export class UpdateItem {
  private readonly itemRepository: ItemRepository;

  constructor(itemRepository: ItemRepository) {
    this.itemRepository = itemRepository;
  }

  async execute(id: number, item: UpdateItemDto): Promise<void> {
    return this.itemRepository.updateItem(id, item);
  }
}
