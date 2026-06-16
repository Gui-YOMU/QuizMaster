import { CreateItemDto } from "../../application/dtos/Item/CreateItemDto.js";
import { UpdateItemDto } from "../../application/dtos/Item/UpdateItemDto.js";
import { ItemInterface } from "../../domain/ports/ItemInterface.js";

export class ItemRepository implements ItemInterface {
    createItem(item: CreateItemDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateItem(id: number, item: UpdateItemDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteItem(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
  
}