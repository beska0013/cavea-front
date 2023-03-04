import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryListUiComponent} from "./component-ui/inventory-list-ui/inventory-list-ui.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, InventoryListUiComponent],
  template: `
  <app-inventory-list-ui [inventoryList]="data.rows"></app-inventory-list-ui>
  `,

})
export class InventoryComponent implements OnInit {

  constructor( private activeRoute: ActivatedRoute) { }

  data:{rows:any[], count:number} = this.activeRoute.snapshot.data['inventoreis'];
  ngOnInit(): void {

  }

}
