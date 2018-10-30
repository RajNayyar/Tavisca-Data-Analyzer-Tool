import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';

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
       for(var i=0;i<Object.keys(data).length;i++)
      {
        if(data[i].bookingStatus=="Planned")
            this.flightFailureCount=data[i].numberOfBookings;
      }
                },
        error=>{ this.errorMsg = error;}

          );
}

}
