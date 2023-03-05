import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryControlUiComponent } from './inventory-control-ui.component';

describe('InventoryControlUiComponent', () => {
  let component: InventoryControlUiComponent;
  let fixture: ComponentFixture<InventoryControlUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InventoryControlUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryControlUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
