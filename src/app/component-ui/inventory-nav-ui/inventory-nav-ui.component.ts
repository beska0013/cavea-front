import { Component, OnInit } from '@angular/core';
import {RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'app-inventory-nav-ui',
  standalone: true,
  template: `

      <div class="container">
        <a [routerLink]="'/'" type="button" class="btn btn-dark">Inventory List</a>
        <a [routerLink]="'add'" type="button" class="btn btn-dark">Add New Inventory Item +</a>
      </div>
  `,

  imports: [
    RouterLinkWithHref
  ]
})
export class InventoryNavUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
