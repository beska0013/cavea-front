import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InventoryItem} from "../../../types/inventoryItem.type";
import {CrudService} from "../../utils/crud/crud.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="container d-flex align-items-center justify-content-center flex-column h-100">

      <form [formGroup]="addInventoryItemFm"
            (submit)="onSubmit()"
            class="w-50 border border-1 border-light rounded shadow p-md-4 fade-in">
        <div class="mb-3">
          <label for="nameInput" class="form-label">Name</label>
          <input type="text"
                 formControlName="name"
                 class="form-control"
                 id="nameInput"
                 aria-describedby="name">
          <p class="form-text">
            <span >
                We'll never share your email with anyone else.
            </span>

          </p>
        </div>
        <div class="mb-3">
          <label for="locationInput" class="form-label">Location</label>
          <input type="text"
                 formControlName="location"
                 class="form-control"
                 id="locationInput"
                 aria-describedby="name">
          <p class="form-text">We'll never share your email with anyone else.</p>
        </div>
        <div class="mb-3">
          <label for="priceInput" class="form-label">Price</label>
          <input type="text"
                 formControlName="price"
                 class="form-control"
                 id="priceInput"
                 aria-describedby="price">
          <p class="form-text">We'll never share your email with anyone else.</p>
        </div>

        <button type="submit" class="btn btn-outline-primary">დამატება</button>
      </form>
            <h2>ან</h2>
     <form  [formGroup]="bulkAddFm"
       class="w-50 border border-1 border-light rounded shadow p-md-4 fade-in">
       <div class="mb-3">
         <label for="formFile"
                class="form-label">Default file input example</label>
         <input class="form-control d-flex"
                (change)="onFileSelected($event)"
                formControlName="fileInput"
                type="file"
                id="formFile">
       </div>
     </form>
    </section>
  `,

})
export class AddInventoryComponent implements OnInit {

  constructor( private srvCrud: CrudService) { }

  addInventoryItemFm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })

  bulkAddFm = new FormGroup({
    fileInput: new FormControl('', Validators.required)
  })

  nameInValid = this.addInventoryItemFm.get('name')?.invalid;

  ngOnInit(): void {
    console.log(this.nameInValid);
  }
  onSubmit(){
    return this.addInventoryItemFm.valid? this.onValidFm(): this.onInvalidFm();

  }

  onFileSelected(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files as FileList;

    if (files.length > 0) {
      const file = files[0];
      if (file.type !== 'text/csv') {
        console.error('Only CSV files are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csvData = reader.result as string;
        console.log(csvData);
        const dataArray = this.convertCsvToArray(csvData);
        this.srvCrud.addInventoryItem(dataArray)
          .pipe(
            tap(res => {
              console.log('onValidFm', res);
            })
          )
          .subscribe()
      };
    }
  }

  convertCsvToArray(csvData: string): InventoryItem[] {
    const lines = csvData.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length - 1; i++) {
      const obj:any = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result as unknown as InventoryItem[];
  }
  private onInvalidFm(){
    console.log('invalid')
  }
  private onValidFm(){
    const inventoryItem:InventoryItem = this.addInventoryItemFm.value as unknown as InventoryItem;
    return this.srvCrud.addInventoryItem([inventoryItem])
      .pipe(
        tap(res => {
          console.log('onValidFm', res);
        })
      )
      .subscribe()
  }

}
