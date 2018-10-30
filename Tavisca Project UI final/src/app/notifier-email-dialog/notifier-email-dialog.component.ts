import { Component, OnInit, Inject } from '@angular/core';
import { GraphsServiceService } from '../service/hotel-service/graphs-service.service';
import { StatsReportNotifierComponent, DialogData } from '../stats-report-notifier/stats-report-notifier.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-notifier-email-dialog',
  templateUrl: './notifier-email-dialog.component.html',
  styleUrls: ['./notifier-email-dialog.component.css']
})
export class NotifierEmailDialogComponent implements OnInit {

  constructor(private service:GraphsServiceService, public dialogRef: MatDialogRef<NotifierEmailDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,public dialog: MatDialog) { }

 notifierLabel=new StatsReportNotifierComponent(this.service,this.dialog);
  
  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSendClick(){
    this.notifierLabel.SendEmail();
    this.dialogRef.close();
  }
}
