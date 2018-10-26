import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOriginDestinationGraphComponent } from './flight-origin-destination-graph.component';

describe('FlightOriginDestinationGraphComponent', () => {
  let component: FlightOriginDestinationGraphComponent;
  let fixture: ComponentFixture<FlightOriginDestinationGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightOriginDestinationGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightOriginDestinationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
