import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBooksComponent } from './latest-books.component';

describe('LatestBooksComponent', () => {
  let component: LatestBooksComponent;
  let fixture: ComponentFixture<LatestBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
