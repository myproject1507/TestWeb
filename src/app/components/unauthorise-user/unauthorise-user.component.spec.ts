import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthoriseUserComponent } from './unauthorise-user.component';

describe('UnauthoriseUserComponent', () => {
  let component: UnauthoriseUserComponent;
  let fixture: ComponentFixture<UnauthoriseUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthoriseUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthoriseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
