import type { ItemRepository } from "../../../domain/ports/ItemRepository";
import type { CreateItemDto } from "../../dtos/Item/CreateItemDto";

export class CreateItem {
  private readonly itemRepository: ItemRepository;
    
      constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
      }
    
      async execute(item: CreateItemDto): Promise<void> {
        return this.itemRepository.createItem(item);
      }
}
