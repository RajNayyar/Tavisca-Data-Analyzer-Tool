import { Component, OnInit, Inject } from '@angular/core';
import { GraphsServiceService } from '../service/data-analytical-service/graphs-service.service';
import { StatsReportNotifierComponent, DialogData } from '../stats-report-notifier/stats-report-notifier.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notifier-email-dialog',
  templateUrl: './notifier-email-dialog.component.html',
  styleUrls: ['./notifier-email-dialog.component.css']
})
export class NotifierEmailDialogComponent implements OnInit {
  public emailForm: FormGroup;
  public buildForm() {
  this.emailForm = this.form.group({
    'email': ['', [Validators.required, Validators.email]],
    });
  }
  public ngOnInit() {
    this.buildForm();
  }
  constructor( public form: FormBuilder,private service:GraphsServiceService, public dialogRef: MatDialogRef<NotifierEmailDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,public dialog: MatDialog) { }

 notifierLabel=new StatsReportNotifierComponent(this.service,this.dialog);
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSendClick(){
    this.notifierLabel.SendEmail();
    this.dialogRef.close();
  }
}
