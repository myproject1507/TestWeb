import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortVideoClipComponent } from './short-video-clip.component';

describe('ShortVideoClipComponent', () => {
  let component: ShortVideoClipComponent;
  let fixture: ComponentFixture<ShortVideoClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortVideoClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortVideoClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
