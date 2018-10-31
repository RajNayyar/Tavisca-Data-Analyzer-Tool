import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { flightFailureComponent } from './failure.component';

describe('flightFailureComponent', () => {
  let component: flightFailureComponent;
  let fixture: ComponentFixture<flightFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ flightFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(flightFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
