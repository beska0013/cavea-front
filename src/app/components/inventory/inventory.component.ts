import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryListUiComponent} from "./component-ui/inventory-list-ui/inventory-list-ui.component";
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../../utils/crud/crud.service";
import {BehaviorSubject, tap} from "rxjs";
import {InventoryItem} from "../../../types/inventoryItem.type";
import {InventoryNavUiComponent} from "./component-ui/inventory-nav-ui/inventory-nav-ui.component";
import {UtilsService} from "../../utils/utils.service";
import {GetInventoryItemResponse} from "../../../types/inventoryItemResponse.type";
import {DeleteInventoryItemResponseType} from "../../../types/DeleteInventoryItemResponse.type";



@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, InventoryListUiComponent, InventoryNavUiComponent],
  template: `
    <section class="container d-flex align-items-center justify-content-start flex-column gap-3 h-100">

      <app-inventory-nav-ui class="w-100"
                            (currentPageChange)="onPageChange($event)"
                            [listItemsCount]="$$count | async"
                            [itemsPerPage]="$$limit | async"
                            [locations]="locationList"
                            [selectedOption]="selectedLocation"
                            (locationChange)="onLocationChange($event)"></app-inventory-nav-ui>

      <app-inventory-list-ui [inventoryList]="$$rows | async"
                             (deleteItem)="onDeleteItem($event)"
                             class="w-100 h-100 overflow-hidden rounded shadow"></app-inventory-list-ui>
    </section>
  `,

})
export class InventoryComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private srvCrud: CrudService,
    private utilSrv:UtilsService
  ) { }

  data:GetInventoryItemResponse = this.activeRoute.snapshot.data['inventories'];
  locationList = this.activeRoute.snapshot.data['locations'];

  selectedLocation = this.activeRoute.snapshot.queryParams['location'] || 'ყველა';

  $$rows = new BehaviorSubject<InventoryItem[]>([]);
  $$limit = new BehaviorSubject<number>(0);
  $$count = new BehaviorSubject<number>(0);
  ngOnInit(): void {
   this.updateDataRows(this.data);
    console.log(this.data);
  }

  onDeleteItem(itemId:number){
    const lastUpdatedItem = Math.min(... this.data.rows.map(item => item.updatedAt));

    this.srvCrud.deleteInventoryById(itemId, lastUpdatedItem)
      .pipe(
        tap((res:DeleteInventoryItemResponseType) =>{
          console.log(res);
          this.data.rows = [...this.data.rows.filter(item => item.id !== res.deleted_id), res.next_item]
          this.data.count -= res.count;
          this.updateDataRows(this.data);
        })
      ).subscribe()
  }

  onLocationChange(location:string){
    return !!location ?
      this.getFilteredInventoryData(location) :
      this.getFilteredInventoryData()
  }

  onPageChange(pageNum:number){
    return this.getPaginatedInventoryData(pageNum)
  }

  getFilteredInventoryData(location = '' ){
    console.log(location);
    return this.srvCrud.getInventories(location)
      .pipe(
        tap((res: GetInventoryItemResponse) => {
          this.updateDataRows(res)
          return this.utilSrv.updateInventoryQueryParam(location, 1)
        })
      ).subscribe()
  }

  getPaginatedInventoryData(pageNum = 1){
    const locationQuery = this.activeRoute.snapshot.queryParams['location'];
    return this.srvCrud.getInventories(locationQuery, pageNum)
      .pipe(
        tap((res: GetInventoryItemResponse) =>{
          this.updateDataRows(res)
          return this.utilSrv.updateInventoryQueryParam(locationQuery, pageNum)
        })
      ).subscribe()
  }

  private updateDataRows(data:GetInventoryItemResponse){
    this.$$count.next(data.count);
    this.$$limit.next(data.limit);
    this.$$rows.next(data.rows);
  }

}
