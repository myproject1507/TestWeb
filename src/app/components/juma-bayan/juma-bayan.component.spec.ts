import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumaBayanComponent } from './juma-bayan.component';

describe('JumaBayanComponent', () => {
  let component: JumaBayanComponent;
  let fixture: ComponentFixture<JumaBayanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JumaBayanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumaBayanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
