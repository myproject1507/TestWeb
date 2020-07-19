import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamazTimeSettingComponent } from './namaz-time-setting.component';

describe('NamazTimeSettingComponent', () => {
  let component: NamazTimeSettingComponent;
  let fixture: ComponentFixture<NamazTimeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamazTimeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamazTimeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
