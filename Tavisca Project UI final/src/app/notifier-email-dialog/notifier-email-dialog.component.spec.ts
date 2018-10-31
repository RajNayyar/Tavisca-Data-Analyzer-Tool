import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierEmailDialogComponent } from './notifier-email-dialog.component';

describe('NotifierEmailDialogComponent', () => {
  let component: NotifierEmailDialogComponent;
  let fixture: ComponentFixture<NotifierEmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifierEmailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifierEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
