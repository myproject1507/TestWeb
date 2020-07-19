import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MadarsaTimeSettingComponent } from './madarsa-time-setting.component';

describe('MadarsaTimeSettingComponent', () => {
  let component: MadarsaTimeSettingComponent;
  let fixture: ComponentFixture<MadarsaTimeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadarsaTimeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadarsaTimeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
