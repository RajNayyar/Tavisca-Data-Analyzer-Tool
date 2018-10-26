import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsReportNotifierComponent } from './stats-report-notifier.component';

describe('StatsReportNotifierComponent', () => {
  let component: StatsReportNotifierComponent;
  let fixture: ComponentFixture<StatsReportNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsReportNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsReportNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
