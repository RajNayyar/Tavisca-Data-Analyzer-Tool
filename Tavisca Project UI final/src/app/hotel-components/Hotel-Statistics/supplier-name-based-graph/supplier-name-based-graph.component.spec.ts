import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierNameBasedGraphComponent } from './supplier-name-based-graph.component';

describe('SupplierNameBasedGraphComponent', () => {
  let component: SupplierNameBasedGraphComponent;
  let fixture: ComponentFixture<SupplierNameBasedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierNameBasedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierNameBasedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
