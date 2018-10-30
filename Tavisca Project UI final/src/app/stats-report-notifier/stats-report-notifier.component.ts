import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from '../service/hotel-service/graphs-service.service';
import { NotifierLabelDialogComponent } from './notifier-label-dialog/notifier-label-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
export interface DialogData {
 
}
@Component({
  selector: 'app-stats-report-notifier',
  templateUrl: './stats-report-notifier.component.html',
  styleUrls: ['./stats-report-notifier.component.css']
})
export class StatsReportNotifierComponent implements OnInit {
  errorMsg:any;
  EmailId: string
  FilterName = []
  StartDate = []
  EndDate = []
  Location = []
  Labels = []
  Statistics = []
  EmailJson ={}
  constructor(private service: GraphsServiceService,public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NotifierLabelDialogComponent, {
      width: '500px'
    });
    
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
    
  // });
}
  SendEmail(){
    this.FilterName = []
    this.StartDate = []
    this.EndDate = []
    this.Location = []
    this.Labels = []
    this.Statistics = []
    this.EmailJson ={}
    
    for(var i = 0; i<this.service.statsReport.length ; i++)
    {
      this.FilterName.push(this.service.statsReport[i].filter)
      this.StartDate.push(this.service.statsReport[i].startDate)
      this.EndDate.push(this.service.statsReport[i].endDate)
      this.Location.push(this.service.statsReport[i].location)
      this.Labels.push(this.service.statsReport[i].labels)
      this.Statistics.push(this.service.statsReport[i].statistics)
    }
    debugger
   this.EmailJson = {
      "RecipientEmialId":this.EmailId,
      "FilterName":this.FilterName,
      "StartDate":this.StartDate,
      "EndDate": this.EndDate,
      "Location": this.Location,
      "Labels":this.Labels,
      "Statistics": this.Statistics
    }
debugger
    this.service.httpEmailSending(this.EmailJson)
    .subscribe(
      data=>{console.log(data);},
      error=>{this.errorMsg=error}
      );
  }
}
