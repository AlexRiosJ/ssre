import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCreateComponent } from './timeline-create.component';

describe('TimelineCreateComponent', () => {
  let component: TimelineCreateComponent;
  let fixture: ComponentFixture<TimelineCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
