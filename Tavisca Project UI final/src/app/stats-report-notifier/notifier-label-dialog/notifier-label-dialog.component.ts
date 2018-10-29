import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogData, StatsReportNotifierComponent } from '../stats-report-notifier.component';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';

@Component({
  selector: 'app-notifier-label-dialog',
  templateUrl: './notifier-label-dialog.component.html',
  styleUrls: ['./notifier-label-dialog.component.css']
})
export class NotifierLabelDialogComponent implements OnInit {
  constructor(private service:GraphsServiceService, public dialogRef: MatDialogRef<NotifierLabelDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,public dialog1: MatDialog) { }

 
  notifierLabel=new StatsReportNotifierComponent(this.service,this.dialog1);
 
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
