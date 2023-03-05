import {InventoryItem} from "./inventoryItem.type";


export type GetInventoryItemResponse = {
  rows:InventoryItem[],
  count:number,
  limit:number
}
