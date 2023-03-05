import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOneFmUiComponent } from './create-one-fm-ui.component';

describe('CreateOneFmUiComponent', () => {
  let component: CreateOneFmUiComponent;
  let fixture: ComponentFixture<CreateOneFmUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOneFmUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOneFmUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
