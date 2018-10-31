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
       for(var i=0;i<Object.keys(data).length;i++)
      {
        if(data[i].bookingStatus=="Purchased")
            this.flightSuccessCount=data[i].numberOfBookings;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
