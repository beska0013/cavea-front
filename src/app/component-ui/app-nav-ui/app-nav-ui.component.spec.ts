import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavUiComponent } from './app-nav-ui.component';

describe('InventoryNavUiComponent', () => {
  let component: AppNavUiComponent;
  let fixture: ComponentFixture<AppNavUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNavUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppNavUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
