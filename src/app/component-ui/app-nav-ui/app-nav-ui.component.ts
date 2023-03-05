import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'app-app-nav-ui',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

      <div class="container d-flex align-items-start justify-content-start gap-3">
        <a [routerLink]="'/inventory'"
           [queryParams]="{location: '', page: '1'}"
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
export class AppNavUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
