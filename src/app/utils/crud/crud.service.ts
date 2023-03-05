import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {InventoryItem} from "../../../types/inventoryItem.type";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private http: HttpClient) { }

  getInventories(location = '', page = 1){
    const url = this.createGetQuerry(location, page)
    return this.http.get(url)
  }

  addInventoryItem(items:InventoryItem[]){
    return this.http.post(environment.api.inventory, items)
  }

  deleteInventoryById(id:number, lastItemId:number){
    const url = `${environment.api.inventory}/${id}`;
    return this.http.delete(url,{body: {id:lastItemId}})
  }

 private createGetQuerry(location:string, page:number){
    const locationQuery = location ? `location=${location}` : 'location';
    const pageQuery = `page=${page}` ;
    return `${environment.api.inventory}?${locationQuery}&${pageQuery}`
 }
}
