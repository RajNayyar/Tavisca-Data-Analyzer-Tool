import { Component, OnInit, Inject } from '@angular/core';
import { StatsReportNotifierComponent, DialogData } from '../stats-report-notifier.component';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notifier-label-dialog',
  templateUrl: './notifier-label-dialog.component.html',
  styleUrls: ['./notifier-label-dialog.component.css']
})
export class NotifierLabelDialogComponent implements OnInit {

  constructor(private service:GraphsServiceService, public dialogRef: MatDialogRef<NotifierLabelDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,public dialog: MatDialog) { }

 
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
