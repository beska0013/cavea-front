import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCSVFmUiComponent } from './upload-csv-fm-ui.component';

describe('UploadCSVFmUiComponent', () => {
  let component: UploadCSVFmUiComponent;
  let fixture: ComponentFixture<UploadCSVFmUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCSVFmUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCSVFmUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
