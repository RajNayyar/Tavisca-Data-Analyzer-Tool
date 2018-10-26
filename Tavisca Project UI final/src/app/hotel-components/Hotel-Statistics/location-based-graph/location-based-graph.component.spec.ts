import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBasedGraphComponent } from './location-based-graph.component';

describe('LocationBasedGraphComponent', () => {
  let component: LocationBasedGraphComponent;
  let fixture: ComponentFixture<LocationBasedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationBasedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBasedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
