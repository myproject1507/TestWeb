import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantKnowledgeComponent } from './important-knowledge.component';

describe('ImportantKnowledgeComponent', () => {
  let component: ImportantKnowledgeComponent;
  let fixture: ComponentFixture<ImportantKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
