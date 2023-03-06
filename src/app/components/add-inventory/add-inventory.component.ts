import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateOneFmUiComponent} from "./component-ui/create-one-fm-ui/create-one-fm-ui.component";
import {CrudService} from "../../utils/crud/crud.service";
import {InventoryItem} from "../../../types/inventoryItem.type";
import {catchError, tap, throwError} from "rxjs";
import {NotificationUiComponent} from "./component-ui/notification-ui/notification-ui.component";

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [CommonModule, CreateOneFmUiComponent, NotificationUiComponent],
  template: `
      <section class="container d-flex align-items-center justify-content-center flex-column h-100 position-relative">
          <app-notification-ui *ngIf="notificationShow"
                               [statuMessage]="notificationMessage"
                               [status]="operationStatus"
                               class="position-absolute top-0 end-0 fade-in"></app-notification-ui>
          <div class="card w-50 h-auto border border-1 border-light rounded shadow  fade-in">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs">
                      <li class="nav-item">
                          <button class="nav-link"
                                  [class]="{'active':oneOrCsvPage}">
                              ნივთის დამატება +
                          </button>
                      </li>
                  </ul>
              </div>
              <div class="card-body d-flex align-items-center">
                  <app-create-one-fm-ui *ngIf="oneOrCsvPage"
                                        class=" w-100"
                                        (creatOneOutput)="createInventoryItems($event)"></app-create-one-fm-ui>
              </div>
          </div>
      </section>
  `,

})
export class AddInventoryComponent {

  constructor(private srvCrud: CrudService) { }
  operationStatus:'success' | 'error'  = 'error';
  notificationMessage: string = '';

  oneOrCsvPage=true;
  notificationShow=false;

  successMessage = 'ნივთი დამატებულია';
  errorMessage = 'გაუთვალისწინებელი შეცდომა, გთხოვთ სცადოთ ხელახლა'

  createInventoryItems(items: InventoryItem[]){
    return this.srvCrud.addInventoryItem(items)
      .pipe(
        tap(res => {
          this.showNotification('success',);
        }),
        catchError((error:any) => {

          this.showNotification('error');
          return throwError(error);
        })
      ).subscribe()
  }

  private showNotification(status: 'success' | 'error'  = 'success'){
    this.notificationShow = true;
    this.operationStatus = status;
    this.notificationMessage = status === 'success' ? this.successMessage : this.errorMessage;
    setTimeout(() => this.notificationShow=false, 3000)
  }

}
