import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InventoryItem} from "../../../../../types/inventoryItem.type";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subscription, tap} from "rxjs";




@Component({
  selector: 'app-create-one-fm-ui',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
              <form [formGroup]="addInventoryItemFm"
                    (submit)="onSubmit()">
                <div class="mb-3">
                  <label for="nameInput" class="form-label">სათაური</label>
                  <input type="text"
                         formControlName="name"
                         class="form-control"
                         id="nameInput"
                         aria-describedby="name">
                  <p class="form-text">
                    <ng-container *ngIf="submitted && addInventoryItemFm.invalid && addInventoryItemFm.controls.name.errors">
                      <span *ngIf="addInventoryItemFm.controls.name.errors['required']"
                            class="text-danger">
                          სათაური სავალდებულოა
                      </span>
                    </ng-container>
                  </p>
                </div>

                <div class="mb-3 position-relative">
                  <label for="locationInput" class="form-label">ადგილმდებარეობა</label>
                  <input type="text"
                         formControlName="location"
                         class="form-control"
                         id="locationInput"
                         aria-describedby="name">
                  <ul *ngIf="$$locationSelectList | async as list"
                  class="list-group w-100 position-absolute end-0">
                    <li *ngFor="let item of list"
                        (click)="onListItemClick(item)"
                        class="list-group-item list-group-item-action list-group-item-primary">{{item}}</li>
                  </ul>

                  <p class="form-text">
                    <ng-container *ngIf="submitted && addInventoryItemFm.invalid && addInventoryItemFm.controls.location.errors">
                    <span class="text-danger"
                          *ngIf="submitted && addInventoryItemFm.controls.location.errors['required']">
                        ადგილმდებარეობა სავალდებულოა
                    </span>
                      <span class="text-danger"
                            *ngIf="submitted && addInventoryItemFm.controls.location.errors['invalidLocation']">
                        ჩანაწერი უნდა შეესაბამებედოს არსებულ ადგილმდებარეობას
                    </span>
                    </ng-container>
                  </p>

                </div>
                <div class="mb-3">
                  <label for="priceInput" class="form-label">ფასი (ლარებში)</label>
                  <input type="text"
                         formControlName="price"
                         class="form-control"
                         id="priceInput"
                         aria-describedby="price">


                  <p class="form-text">
                    <ng-container *ngIf="submitted && addInventoryItemFm.invalid && addInventoryItemFm.controls.price.errors">
                    <span class="text-danger"
                          *ngIf="submitted && addInventoryItemFm.controls.price.errors['required']">
                        ფასი სავალდებულოა
                    </span>
                      <span class="text-danger"
                            *ngIf="submitted && addInventoryItemFm.controls.price.errors['invalidNumber']">
                        არასწორი ფორმატი
                    </span>
                    </ng-container>
                  </p>
                </div>

                <button type="submit" class="btn btn-outline-primary">დამატება</button>
              </form>
  `

})
export class CreateOneFmUiComponent implements OnInit,OnDestroy{


  @Output() creatOneOutput = new EventEmitter<InventoryItem[]>();
  submitted = false;
  constructor(
    private activeRoute: ActivatedRoute,
    ) { }

  locationList = this.activeRoute.snapshot.data['locations'];

  $$locationSelectList = new BehaviorSubject([]);

  locationSub$$: Subscription | undefined;

  addInventoryItemFm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required, this.locationFieldValidator.bind(this)]),
    price: new FormControl('', [Validators.required, this.numericValidator])
  })

  ngOnInit(): void {
    this.locationSub$$ = this.addInventoryItemFm.controls.location.valueChanges
      .pipe(
        tap((res) =>!!res ?
          this.$$locationSelectList.next(this.locationList.filter((item:string) => item.includes(res as string))):
          this.$$locationSelectList.next([])
        )
      ).subscribe()

  }

  ngOnDestroy(): void {
    this.locationSub$$?.unsubscribe()
  }

  onSubmit(){
    this.submitted = true;
    return this.addInventoryItemFm.valid? this.onValidFm(): this.onInvalidFm();
  }
  onListItemClick(val:string){
    this.addInventoryItemFm.controls.location.setValue(val);
    this.$$locationSelectList.next([])
  }
  private onInvalidFm(){
    console.log('invalid')
  }
  private onValidFm(){
    const inventoryItem:InventoryItem = this.addInventoryItemFm.value as unknown as InventoryItem;
    this.creatOneOutput.emit([inventoryItem]);
    this.addInventoryItemFm.reset();
    this.submitted = false;
  }

  private locationFieldValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;
    return this.locationList.includes(value) ? null : { 'invalidLocation': true };
  }

  private numericValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;
    const regex = /^[0-9]*$/;
    return regex.test(value) ? null : { 'invalidNumber': true };
  }

}
