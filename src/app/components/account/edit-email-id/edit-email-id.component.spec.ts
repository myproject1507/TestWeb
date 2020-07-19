import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailIdComponent } from './edit-email-id.component';

describe('EditEmailIdComponent', () => {
  let component: EditEmailIdComponent;
  let fixture: ComponentFixture<EditEmailIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmailIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
