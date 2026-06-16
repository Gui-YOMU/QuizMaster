import { ItemInterface } from "../../../domain/ports/ItemInterface.js";

export class DeleteItem {
  private itemInterface: ItemInterface;

  constructor(itemInterface: ItemInterface) {
    this.itemInterface = itemInterface;
  }

  async execute(id: number): Promise<void> {
    return this.itemInterface.deleteItem(id);
  }
}
