import type { ItemRepository } from "../../../domain/ports/ItemRepository";

export class DeleteItem {
  private readonly itemRepository: ItemRepository;

  constructor(itemRepository: ItemRepository) {
    this.itemRepository = itemRepository;
  }

  async execute(id: number): Promise<void> {
    return this.itemRepository.deleteItem(id);
  }
}
