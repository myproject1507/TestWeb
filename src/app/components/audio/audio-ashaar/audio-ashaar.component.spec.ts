import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioAshaarComponent } from './audio-ashaar.component';

describe('AudioAshaarComponent', () => {
  let component: AudioAshaarComponent;
  let fixture: ComponentFixture<AudioAshaarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioAshaarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioAshaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
