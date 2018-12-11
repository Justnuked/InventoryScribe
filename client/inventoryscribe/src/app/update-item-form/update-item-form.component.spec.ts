import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemFormComponent } from './update-item-form.component';

describe('UpdateItemFormComponent', () => {
  let component: UpdateItemFormComponent;
  let fixture: ComponentFixture<UpdateItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
