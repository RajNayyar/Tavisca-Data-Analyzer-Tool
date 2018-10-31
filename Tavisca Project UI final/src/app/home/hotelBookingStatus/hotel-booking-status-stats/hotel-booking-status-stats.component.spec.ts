import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingStatusStatsComponent } from './hotel-booking-status-stats.component';

describe('HotelBookingStatusStatsComponent', () => {
  let component: HotelBookingStatusStatsComponent;
  let fixture: ComponentFixture<HotelBookingStatusStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelBookingStatusStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBookingStatusStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
