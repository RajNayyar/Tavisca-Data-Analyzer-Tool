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
      for(var i=0;i<Object.keys(data).length;i++)
      {
        if(data[i].type=="Planned")
            this.failureCount=data[i].count;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
