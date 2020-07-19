import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioMaulanaBayanComponent } from './audio-maulana-bayan.component';

describe('AudioMaulanaBayanComponent', () => {
  let component: AudioMaulanaBayanComponent;
  let fixture: ComponentFixture<AudioMaulanaBayanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioMaulanaBayanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioMaulanaBayanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
