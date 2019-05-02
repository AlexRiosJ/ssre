import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListCreateComponent } from './group-list-create.component';

describe('GroupListCreateComponent', () => {
  let component: GroupListCreateComponent;
  let fixture: ComponentFixture<GroupListCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
