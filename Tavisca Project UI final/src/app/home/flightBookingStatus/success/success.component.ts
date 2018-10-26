import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';

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
      this.flightSuccessCount=data[1].numberOfBookings;
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
