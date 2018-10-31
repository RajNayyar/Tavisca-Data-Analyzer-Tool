import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { flightSuccessComponent } from './success.component';

describe('flightSuccessComponent', () => {
  let component: flightSuccessComponent;
  let fixture: ComponentFixture<flightSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ flightSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(flightSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
