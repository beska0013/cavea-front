import { Component, OnInit } from '@angular/core';
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'app-inventory-nav-ui',
  standalone: true,

  template: `

      <div class="container d-flex align-items-start justify-content-start gap-3">
        <a [routerLink]="'/inventory'"
           routerLinkActive="active"
           type="button"
           class="btn btn-dark">ნივთების სია</a>
        <a [routerLink]="'/add'"
           routerLinkActive="active"
           type="button"
           class="btn btn-dark">ახალი ნივთის დამატება+</a>
      </div>
  `,

  imports: [
    RouterLinkWithHref,
    RouterLinkActive
  ]
})
export class InventoryNavUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
