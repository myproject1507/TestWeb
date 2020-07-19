import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarulIftaServiceOnOffComponent } from './darul-ifta-service-on-off.component';

describe('DarulIftaServiceOnOffComponent', () => {
  let component: DarulIftaServiceOnOffComponent;
  let fixture: ComponentFixture<DarulIftaServiceOnOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarulIftaServiceOnOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarulIftaServiceOnOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
