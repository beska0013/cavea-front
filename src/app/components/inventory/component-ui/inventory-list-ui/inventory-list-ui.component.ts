import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryItem} from "../../../../../types/inventoryItem.type";

@Component({
  selector: 'app-inventory-list-ui',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="table" *ngIf="inventoryList as list">
      <thead>
      <tr class="table-dark">
        <th *ngFor="let item of tbHead">{{item}}</th>
      </tr>
      </thead>

      <tbody>

      <tr *ngFor="let item of list" class="table-light">
        <td>{{item.name}}</td>
        <td>{{item.location}}</td>
        <td>{{item.price}}</td>
        <td>
          <button class="btn btn-danger" (click)="onDelete(item.id)">{{delete_itemText}}</button>
        </td>
      </tr>

      </tbody>
    </table>
  `,

})
export class InventoryListUiComponent implements OnInit {

  constructor() { }

  @Input() inventoryList!: InventoryItem[] | null;
  @Output() deleteItem = new EventEmitter<number>();

  tbHead=[
    'სახელი',
    'ადგილმდებარეობა',
    'ფასი (ლარებში)',
    'ოპერაციები'
  ]
  delete_itemText = 'წაშლა';
  ngOnInit(): void {
     console.log(this.inventoryList);
  }

  onDelete(itemId:number){
    this.deleteItem.emit(itemId)
 }
}
