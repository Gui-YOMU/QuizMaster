import { ItemInterface } from "../../../domain/ports/ItemInterface.js";
import type { UpdateItemDto } from "../../dtos/Item/UpdateItemDto.js";

export class UpdateItem {
  private itemInterface: ItemInterface;

  constructor(itemInterface: ItemInterface) {
    this.itemInterface = itemInterface;
  }

  async execute(id: number, item: UpdateItemDto): Promise<void> {
    return this.itemInterface.updateItem(id, item);
  }
}
