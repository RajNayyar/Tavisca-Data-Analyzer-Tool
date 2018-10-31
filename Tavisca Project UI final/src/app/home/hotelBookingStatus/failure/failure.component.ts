import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
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
      for(var hotelFailureIndex=0;hotelFailureIndex<Object.keys(data).length;hotelFailureIndex++)
      {
        if(data[hotelFailureIndex].type=="Planned")
            this.failureCount=data[hotelFailureIndex].count;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
