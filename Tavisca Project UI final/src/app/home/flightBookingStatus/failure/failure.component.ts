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
      this.flightFailureCount=data[0].numberOfBookings;
                },
        error=>{ this.errorMsg = error;}

          );
}

}
