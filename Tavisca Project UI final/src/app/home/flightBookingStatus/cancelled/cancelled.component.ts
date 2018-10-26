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
      this.flightCancellationCount=data[2].numberOfBookings;
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
