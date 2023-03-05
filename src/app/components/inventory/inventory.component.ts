import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryListUiComponent} from "./component-ui/inventory-list-ui/inventory-list-ui.component";
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../../utils/crud/crud.service";
import {BehaviorSubject, tap} from "rxjs";
import {InventoryItem} from "../../../types/inventoryItem.type";



@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, InventoryListUiComponent],
  template: `

    <section class="container">
      <app-inventory-list-ui [inventoryList]="$$rows | async"
                             (deleteItem)="onDeleteItem($event)"></app-inventory-list-ui>
    </section>
  `,

})
export class InventoryComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private srvCrud: CrudService
  ) { }

  data:{rows:any[], total:number} = this.activeRoute.snapshot.data['inventories'];

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

  private updateDataRows(rows:any[]){
    this.$$rows.next(rows);
  }

}
