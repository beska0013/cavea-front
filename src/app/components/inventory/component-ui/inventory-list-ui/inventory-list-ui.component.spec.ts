import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListUiComponent } from './inventory-list-ui.component';

describe('InventoryListUiComponent', () => {
  let component: InventoryListUiComponent;
  let fixture: ComponentFixture<InventoryListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InventoryListUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
