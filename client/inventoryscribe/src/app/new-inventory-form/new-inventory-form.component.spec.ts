import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInventoryFormComponent } from './new-inventory-form.component';

describe('NewInventoryFormComponent', () => {
  let component: NewInventoryFormComponent;
  let fixture: ComponentFixture<NewInventoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInventoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInventoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
