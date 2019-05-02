import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemCreateComponent } from './group-item-create.component';

describe('GroupItemCreateComponent', () => {
  let component: GroupItemCreateComponent;
  let fixture: ComponentFixture<GroupItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
