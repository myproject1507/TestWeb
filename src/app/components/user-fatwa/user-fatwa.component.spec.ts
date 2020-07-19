import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFatwaComponent } from './user-fatwa.component';

describe('UserFatwaComponent', () => {
  let component: UserFatwaComponent;
  let fixture: ComponentFixture<UserFatwaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFatwaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFatwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
