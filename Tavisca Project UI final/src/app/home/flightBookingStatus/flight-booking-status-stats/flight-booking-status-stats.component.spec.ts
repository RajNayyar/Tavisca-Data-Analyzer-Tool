import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingStatusStatsComponent } from './flight-booking-status-stats.component';

describe('FlightBookingStatusStatsComponent', () => {
  let component: FlightBookingStatusStatsComponent;
  let fixture: ComponentFixture<FlightBookingStatusStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBookingStatusStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingStatusStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
