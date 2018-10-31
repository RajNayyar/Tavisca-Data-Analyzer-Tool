import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';

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
      for(var hotelCancellationIndex=0;hotelCancellationIndex<Object.keys(data).length;hotelCancellationIndex++)
      {
        if(data[hotelCancellationIndex].type=="Canceled")
            this.cancellationCount=data[hotelCancellationIndex].count;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }
}
