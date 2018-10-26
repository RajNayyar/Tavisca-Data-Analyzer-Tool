import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelNamesWithDatesGraphComponent } from './hotel-names-with-dates-graph.component';

describe('HotelNamesWithDatesGraphComponent', () => {
  let component: HotelNamesWithDatesGraphComponent;
  let fixture: ComponentFixture<HotelNamesWithDatesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelNamesWithDatesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelNamesWithDatesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
