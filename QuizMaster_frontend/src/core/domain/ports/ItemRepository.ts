import type { CreateItemDto } from "../../application/dtos/Item/CreateItemDto";
import type { UpdateItemDto } from "../../application/dtos/Item/UpdateItemDto";

export interface ItemRepository {
  createItem(item: CreateItemDto): Promise<void>;

  updateItem(id: number, item: UpdateItemDto): Promise<void>;

  deleteItem(id: number): Promise<void>;
}
