import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';

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
      for(var cancelledIndex=0;cancelledIndex<Object.keys(data).length;cancelledIndex++)
      {
        if(data[cancelledIndex].bookingStatus=="Canceled")
            this.flightCancellationCount=data[cancelledIndex].numberOfBookings;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
