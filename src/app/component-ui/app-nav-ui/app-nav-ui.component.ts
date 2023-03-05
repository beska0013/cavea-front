import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-app-nav-ui',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="container d-flex align-items-start justify-content-start gap-3">
        <a [routerLink]="'/inventory'"
           [queryParams]="queryParams | async"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: false}"
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
    RouterLinkActive,
    AsyncPipe
  ]
})
export class AppNavUiComponent{

  constructor(private activeRouter: ActivatedRoute) { }

  queryParams = this.activeRouter.queryParams;


}
