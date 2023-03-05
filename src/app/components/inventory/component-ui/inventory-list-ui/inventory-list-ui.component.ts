import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryItem} from "../../../../../types/inventoryItem.type";
import {UtilsService} from "../../../../utils/utils.service";

@Component({
  selector: 'app-inventory-list-ui',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-100 w-100 border border-1 border-light rounded shadow-lg overflow-auto custom-scrol" #tbContainerEl>
      <table class="table table-hover" *ngIf="inventoryList as list">
        <thead #tbHeadEL>
        <tr class="bg-dark" >
          <th scope="col" class="text-bg-light position-sticky top-0">#</th>
          <th scope="col" class="text-bg-light position-sticky top-0" *ngFor="let item of tbHead">{{item}}</th>
        </tr>
        </thead>

        <tbody>

        <tr *ngFor="let item of list;index as i;trackBy:trackItems" >
          <th scope="row">{{item.id}}</th>
          <td>{{item.name}}</td>
          <td>{{item.location}}</td>
          <td>{{item.price}}</td>
          <td>
            <button class="btn btn-danger" (click)="onDelete(item.id)">{{delete_itemText}}</button>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

  `,

})
export class InventoryListUiComponent  {

  constructor(private utilSrv: UtilsService) { }

  @ViewChild('tbContainerEl') tbContainerEl!: ElementRef;
  @ViewChild('tbHeadEL') tbHeadEl!: ElementRef;

  @Input() inventoryList!: InventoryItem[] | null;
  @Output() deleteItem = new EventEmitter<number>();

  tbHead=[
    'სახელი',
    'ადგილმდებარეობა',
    'ფასი (ლარებში)',
    'ოპერაციები'
  ]
  delete_itemText = 'წაშლა';

  trackItems = this.utilSrv.trackByFn;

  onDelete(itemId:number){
    this.deleteItem.emit(itemId)
 }


}
