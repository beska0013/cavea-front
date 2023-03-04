import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryItem} from "../../../../../types/inventoryItem.type";

@Component({
  selector: 'app-inventory-list-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-list-ui.component.html',
  styleUrls: ['./inventory-list-ui.component.scss']
})
export class InventoryListUiComponent implements OnInit {

  constructor() { }

  @Input() inventoryList: InventoryItem[] | undefined;

  ngOnInit(): void {
    console.log(this.inventoryList);
  }

}
