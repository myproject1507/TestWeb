import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTodayComponent } from './lesson-today.component';

describe('LessonTodayComponent', () => {
  let component: LessonTodayComponent;
  let fixture: ComponentFixture<LessonTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
