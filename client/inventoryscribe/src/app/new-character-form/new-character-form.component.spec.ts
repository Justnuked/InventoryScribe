import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCharacterFormComponent } from './new-character-form.component';

describe('NewCharacterFormComponent', () => {
  let component: NewCharacterFormComponent;
  let fixture: ComponentFixture<NewCharacterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCharacterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
