import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';

@Component({
  selector: 'flight-app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.css']
})
export class flightCancelledComponent implements OnInit {
  errorMsg: any;
  flightCancellationCount: any;
  constructor(private service:GraphsServiceService) { }

  ngOnInit() {
    this.service.httpResponseFilters("Air","TotalBookings")
    .subscribe( data=>{
      for(var i=0;i<Object.keys(data).length;i++)
      {
        if(data[i].bookingStatus=="Canceled")
            this.flightCancellationCount=data[i].numberOfBookings;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
