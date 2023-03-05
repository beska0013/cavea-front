import {InventoryItem} from "./inventoryItem.type";


export type DeleteInventoryItemResponseType = {
  deleted_id: number,
  next_item: InventoryItem,
  count: number
}
