import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModeBasedGraphComponent } from './payment-mode-based-graph.component';

describe('PaymentModeBasedGraphComponent', () => {
  let component: PaymentModeBasedGraphComponent;
  let fixture: ComponentFixture<PaymentModeBasedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentModeBasedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentModeBasedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
