import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPaymentModeComponent } from './flight-payment-mode.component';

describe('FlightPaymentModeComponent', () => {
  let component: FlightPaymentModeComponent;
  let fixture: ComponentFixture<FlightPaymentModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightPaymentModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightPaymentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
