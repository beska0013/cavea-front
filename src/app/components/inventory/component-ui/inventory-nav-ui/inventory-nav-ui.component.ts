import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-inventory-nav-ui',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-100 d-flex align-items-center justify-content-between gap-3">
      <select class="w-50 form-select border border-1 border-light rounded shadow-sm"
              [(ngModel)]="selectedOption"
             (ngModelChange)="onLocationChange($event)">
        <option [value]="defaultOption">{{defaultOption}}</option>
        <option *ngFor="let loc of locations;index as i" [value]="loc">{{loc}}</option>
      </select>

      <ul class="pagination m-0 shadow-sm">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </div>

  `,

})
export class InventoryNavUiComponent implements OnInit {

  constructor() { }

  @Input() locations: string[] = [];

  @Input() currentPage: number = 1;

  @Input() selectedOption!:string;

  @Output() locationChange = new EventEmitter<string>();

  defaultOption = 'ყველა';

  onLocationChange(event: string) {
    return this.defaultOption === this.selectedOption ?
      this.locationChange.emit('') :
      this.locationChange.emit(event);
  }

  ngOnInit(): void {
    console.log(this.selectedOption);
  }

}
