import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSessionComponent } from './single-session.component';

describe('SingleSessionComponent', () => {
  let component: SingleSessionComponent;
  let fixture: ComponentFixture<SingleSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
