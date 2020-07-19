import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishBooksComponent } from './english-books.component';

describe('EnglishBooksComponent', () => {
  let component: EnglishBooksComponent;
  let fixture: ComponentFixture<EnglishBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnglishBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
