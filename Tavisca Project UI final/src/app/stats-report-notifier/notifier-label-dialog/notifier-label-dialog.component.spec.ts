import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierLabelDialogComponent } from './notifier-label-dialog.component';

describe('NotifierLabelDialogComponent', () => {
  let component: NotifierLabelDialogComponent;
  let fixture: ComponentFixture<NotifierLabelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifierLabelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifierLabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
