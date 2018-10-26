import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {

 errorMsg: any;
  failureCount: any;
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit() {
  
    this.service.httpResponseFilters("Hotels","TotalBookings")
    .subscribe( data=>{
            this.failureCount=data[0].count;
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
