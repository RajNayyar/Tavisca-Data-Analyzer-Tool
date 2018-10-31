import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';

@Component({
  selector: 'flight-app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class flightFailureComponent implements OnInit {
  errorMsg: any;
  flightFailureCount: any;
  constructor(private service:GraphsServiceService) { }

  ngOnInit() {
    this.service.httpResponseFilters("Air","TotalBookings")
    .subscribe( data=>{   
       for(var failureIndex=0;failureIndex<Object.keys(data).length;failureIndex++)
      {
        if(data[failureIndex].bookingStatus=="Planned")
            this.flightFailureCount=data[failureIndex].numberOfBookings;
      }
                },
        error=>{ this.errorMsg = error;}

          );
}

}
