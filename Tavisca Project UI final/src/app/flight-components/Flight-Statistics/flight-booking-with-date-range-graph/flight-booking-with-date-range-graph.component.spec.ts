import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingWithDateRangeGraphComponent } from './flight-booking-with-date-range-graph.component';

describe('FlightBookingWithDateRangeGraphComponent', () => {
  let component: FlightBookingWithDateRangeGraphComponent;
  let fixture: ComponentFixture<FlightBookingWithDateRangeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBookingWithDateRangeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingWithDateRangeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
