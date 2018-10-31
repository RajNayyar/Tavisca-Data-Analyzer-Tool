import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';

@Component({
  selector: 'flight-app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class flightSuccessComponent implements OnInit {
  errorMsg: any;
  flightSuccessCount: any;
  constructor(private service:GraphsServiceService) { }

  ngOnInit() {
    this.service.httpResponseFilters("Air","TotalBookings")
    .subscribe( data=>{   
       for(var successIndex=0;successIndex<Object.keys(data).length;successIndex++)
      {
        if(data[successIndex].bookingStatus=="Purchased")
            this.flightSuccessCount=data[successIndex].numberOfBookings;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
