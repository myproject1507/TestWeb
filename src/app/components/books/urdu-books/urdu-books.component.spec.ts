import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrduBooksComponent } from './urdu-books.component';

describe('UrduBooksComponent', () => {
  let component: UrduBooksComponent;
  let fixture: ComponentFixture<UrduBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrduBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrduBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
