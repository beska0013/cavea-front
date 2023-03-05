import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryListUiComponent} from "./component-ui/inventory-list-ui/inventory-list-ui.component";
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../../utils/crud/crud.service";
import {BehaviorSubject, tap} from "rxjs";
import {InventoryItem} from "../../../types/inventoryItem.type";
import {InventoryNavUiComponent} from "./component-ui/inventory-nav-ui/inventory-nav-ui.component";
import {UtilsService} from "../../utils/utils.service";



@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, InventoryListUiComponent, InventoryNavUiComponent],
  template: `
    <section class="container d-flex align-items-center justify-content-start flex-column gap-3 h-100">

      <app-inventory-nav-ui class="w-100"
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

  data:{rows:any[], total:number} = this.activeRoute.snapshot.data['inventories'];
  locationList = this.activeRoute.snapshot.data['locations'];

  selectedLocation = this.activeRoute.snapshot.queryParams['location'] || 'ყველა';

  $$rows = new BehaviorSubject<InventoryItem[]>([]);
  ngOnInit(): void {
   this.updateDataRows(this.data.rows);

  }

  onDeleteItem(itemId:number){
    const rowsLastItemId = this.data.rows.at(-1).id;
    this.srvCrud.deleteInventoryById(itemId, rowsLastItemId)
      .pipe(
        tap((res) =>{
          this.data.rows = [...this.data.rows.filter(item => item.id !== itemId), res]
          this.updateDataRows(this.data.rows);
        })
      )
      .subscribe()
  }

  onLocationChange(location:string){
    return !!location ?
      this.getFilteredInventoryData(location) :
      this.getFilteredInventoryData()
  }

  getFilteredInventoryData(location = '' ){
    return this.srvCrud.getInventories(location)
      .pipe(
        tap((res: {rows:any[], total:number}) => {
          this.updateDataRows(res.rows)
          const pageQuery = this.activeRoute.snapshot.queryParams['page'];
          return this.utilSrv.updateInventoryQueryParam(location, pageQuery)
        })
      ).subscribe()
  }

  private updateDataRows(rows:any[]){
    this.$$rows.next(rows);
  }

}
