import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBayanTimerSettingComponent } from './live-bayan-timer-setting.component';

describe('LiveBayanTimerSettingComponent', () => {
  let component: LiveBayanTimerSettingComponent;
  let fixture: ComponentFixture<LiveBayanTimerSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveBayanTimerSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveBayanTimerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
