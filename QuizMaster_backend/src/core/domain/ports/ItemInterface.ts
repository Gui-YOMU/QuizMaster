import type { CreateItemDto } from "../../application/dtos/Item/CreateItemDto.js";
import type { UpdateItemDto } from "../../application/dtos/Item/UpdateItemDto.js";

export interface ItemInterface {
  createItem(item: CreateItemDto): Promise<void>;

  updateItem(id: number, item: UpdateItemDto): Promise<void>;

  deleteItem(id: number): Promise<void>;
}
