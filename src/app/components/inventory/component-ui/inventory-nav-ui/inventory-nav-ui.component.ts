import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";

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

      <ul class="pagination m-0 shadow-sm"
          *ngIf="lastPageNum > 0">
        <li class="page-item">
          <button class="page-link"
                  (click)="setCurrentPage(firstPageNum)">
            First Page
          </button>
        </li>
        <li class="page-item">
          <button class="page-link"
                  [class.disabled]="currentPage === firstPageNum"
                  (click)="setCurrentPage(currentPage - 1)"
                  [disabled]="currentPage === firstPageNum">
            Previous
          </button>
        </li>

        <ng-container *ngFor="let num of pageNumbers">
          <li class="page-item" [class]="{'active': onPagequeryParamsChange(num) | async}">
            <button class="page-link"
                    (click)="setCurrentPage(num)">
              {{num}}
            </button>
          </li>
        </ng-container>

        <li class="page-item">
          <button class="page-link"
                  [class.disabled]="currentPage === lastPageNum"
                  (click)="setCurrentPage(currentPage + 1)"
                  [disabled]="currentPage === lastPageNum">
            Next
          </button>
        </li>
        <li class="page-item">
          <button class="page-link"
                  (click)="setCurrentPage(lastPageNum)">
            Last Page
          </button>
        </li>
      </ul>
    </div>

  `,

})
export class InventoryNavUiComponent implements OnInit, OnChanges{

  constructor(
    private router: ActivatedRoute,

    private cdr: ChangeDetectorRef
  ) {}

  @Input() locations: string[] = [];

  @Input() currentPage: number = 1;

  @Input() selectedOption!:string;

  @Input() listItemsCount!:number | null;

  @Input() itemsPerPage!:number | null;

  @Output() locationChange = new EventEmitter<string>();

  @Output() currentPageChange = new EventEmitter<number>();

  defaultOption = 'ყველა';

  lastPageNum = 0;
  firstPageNum = 1;

  pageNumberMaxLength = 5;

  pageNumbers:number[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (
        changes['listItemsCount'] && changes['listItemsCount'].currentValue ||
        changes['itemsPerPage'] && changes['itemsPerPage'].currentValue
    ){
      this.resetPagination();
    }
  }
  ngOnInit(): void {}


  onPagequeryParamsChange(pageNumBTn?: number):Observable<boolean>{
    return this.router.queryParams
      .pipe(
        map((res:any) => Number(res.page) === pageNumBTn),
      )
  }

  setCurrentPage(page: number){
    page = page < this.firstPageNum ? this.firstPageNum : page;
    page = page > this.lastPageNum ? this.lastPageNum : page;
    this.currentPage = page;
    this.currentPageChange.emit(this.currentPage);
    this.pageNumbers = this.calcVisiblePageNumbers();
  }

  onLocationChange(event: string) {
    this.currentPage = this.firstPageNum;
    this.selectedOption = event;
    return this.defaultOption === this.selectedOption ?
      this.locationChange.emit('') :
      this.locationChange.emit(event);
  }

  private calcLastPageNumber(){
    return Math.ceil((this.listItemsCount as number) / (this.itemsPerPage as number));
  }

  private calcVisiblePageNumbers():number[]{
    const displayedPagesSidesNum = Math.floor(this.pageNumberMaxLength / 2);
      let startPage = Math.max(this.firstPageNum, this.currentPage - displayedPagesSidesNum);
      let endPage = Math.min(this.lastPageNum, startPage + (this.pageNumberMaxLength - 1));

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
      .slice(-(this.pageNumberMaxLength))
      .concat(startPage > this.firstPageNum ? startPage - this.firstPageNum : [])
      .sort((a, b) => a - b);
  }

  private resetPagination(){
    this.lastPageNum = this.calcLastPageNumber();
    this.pageNumbers = this.calcVisiblePageNumbers();
    this.cdr.markForCheck();
  }




}
