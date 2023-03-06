import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {InventoryItem} from "../../../types/inventoryItem.type";
import {Observable} from "rxjs";
import {GetInventoryItemResponse} from "../../../types/inventoryItemResponse.type";
import {DeleteInventoryItemResponseType} from "../../../types/DeleteInventoryItemResponse.type";


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllLocations(): Observable<string[]> {
    return this.http.get(environment.api.locations) as Observable<string[]>
  }

  getInventories(location = '', page = 1) {
    const url = this.createGetQuerry(location, page)
    return this.http.get(url) as Observable<GetInventoryItemResponse>
  }

  addInventoryItem(items: InventoryItem[]) {
    return this.http.post(environment.api.inventory, items)
  }

  deleteInventoryById(id: number, lastItemId: number): Observable<DeleteInventoryItemResponseType> {
    const url = `${environment.api.inventory}/${id}`;
    return this.http.delete(url, {body: {id: lastItemId}}) as Observable<DeleteInventoryItemResponseType>
  }

  private createGetQuerry(location: string, page: number) {
    const locationQuery = location ? `location=${location}` : 'location';
    const pageQuery = `page=${page}`;
    return `${environment.api.inventory}?${locationQuery}&${pageQuery}`
  }
}
