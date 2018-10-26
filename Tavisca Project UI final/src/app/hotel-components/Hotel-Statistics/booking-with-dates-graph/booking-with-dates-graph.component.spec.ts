import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingWithDatesGraphComponent } from './booking-with-dates-graph.component';

describe('RatingBasedGraphComponent', () => {
  let component: BookingWithDatesGraphComponent;
  let fixture: ComponentFixture<BookingWithDatesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingWithDatesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingWithDatesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
