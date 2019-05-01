import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListCreateComponent } from './subject-list-create.component';

describe('SubjectListCreateComponent', () => {
  let component: SubjectListCreateComponent;
  let fixture: ComponentFixture<SubjectListCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectListCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
