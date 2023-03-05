import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-control-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-control-ui.component.html',
  styleUrls: ['./inventory-control-ui.component.scss']
})
export class InventoryControlUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
