import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryNavUiComponent } from './inventory-nav-ui.component';

describe('InventoryNavUiComponent', () => {
  let component: InventoryNavUiComponent;
  let fixture: ComponentFixture<InventoryNavUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryNavUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryNavUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
