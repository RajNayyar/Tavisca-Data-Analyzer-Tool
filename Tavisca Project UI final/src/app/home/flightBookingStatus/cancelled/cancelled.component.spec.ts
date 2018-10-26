import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { flightCancelledComponent } from './cancelled.component';

describe('flightCancelledComponent', () => {
  let component: flightCancelledComponent;
  let fixture: ComponentFixture<flightCancelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ flightCancelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(flightCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
