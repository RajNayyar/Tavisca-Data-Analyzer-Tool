import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTotalBookingsGraphComponent } from './flight-total-bookings-graph.component';

describe('FlightTotalBookingsGraphComponent', () => {
  let component: FlightTotalBookingsGraphComponent;
  let fixture: ComponentFixture<FlightTotalBookingsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightTotalBookingsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTotalBookingsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
