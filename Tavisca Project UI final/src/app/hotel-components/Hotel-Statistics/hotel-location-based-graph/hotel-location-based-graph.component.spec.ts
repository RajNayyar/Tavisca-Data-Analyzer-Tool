import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelLocationBasedGraphComponent } from './hotel-location-based-graph.component';

describe('HotelLocationBasedGraphComponent', () => {
  let component: HotelLocationBasedGraphComponent;
  let fixture: ComponentFixture<HotelLocationBasedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelLocationBasedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelLocationBasedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
