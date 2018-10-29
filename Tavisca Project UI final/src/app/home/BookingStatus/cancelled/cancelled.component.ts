import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.css']
})
export class CancelledComponent implements OnInit {

  errorMsg: any;
  cancellationCount: any;
 constructor (private service:GraphsServiceService) { }
 
  ngOnInit() {
  
    this.service.httpResponseFilters("Hotels","TotalBookings")
    .subscribe( data=>{
      
      for(var i=0;i<Object.keys(data).length;i++)
      {
        if(data[i].type=="Canceled")
            this.cancellationCount=data[i].count;
      }
        },
        error=>{ this.errorMsg = error;}

          );
  }
}
