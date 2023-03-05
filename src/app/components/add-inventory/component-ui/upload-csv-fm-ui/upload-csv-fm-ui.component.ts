import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {InventoryItem} from "../../../../../types/inventoryItem.type";
import {CrudService} from "../../../../utils/crud/crud.service";

@Component({
  selector: 'app-upload-csv-fm-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <form  [formGroup]="bulkAddFm">
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
  `

})
export class UploadCSVFmUiComponent implements OnInit {

  constructor(private srvCrud: CrudService) { }

  bulkAddFm = new FormGroup({
    fileInput: new FormControl('', Validators.required)
  })

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

  private convertCsvToArray(csvData: string): InventoryItem[] {
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
  ngOnInit(): void {
  }

}
