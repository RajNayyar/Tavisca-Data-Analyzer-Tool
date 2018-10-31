import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingAirlineGraphComponent } from './marketing-airline-graph.component';

describe('MarketingAirlineGraphComponent', () => {
  let component: MarketingAirlineGraphComponent;
  let fixture: ComponentFixture<MarketingAirlineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingAirlineGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingAirlineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
