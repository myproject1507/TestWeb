import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyFatwaComponent } from './reply-fatwa.component';

describe('ReplyFatwaComponent', () => {
  let component: ReplyFatwaComponent;
  let fixture: ComponentFixture<ReplyFatwaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyFatwaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyFatwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
