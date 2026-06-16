import { ItemInterface } from "../../../domain/ports/ItemInterface.js";
import type { CreateItemDto } from "../../dtos/Item/CreateItemDto.js";

export class CreateItem {
  private itemInterface: ItemInterface;

  constructor(teamToQuestionInterface: ItemInterface) {
    this.itemInterface = teamToQuestionInterface;
  }

  async execute(item: CreateItemDto): Promise<void> {
    return this.itemInterface.createItem(item);
  }
}
