import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  errorMsg: any;
  successCount: any;
  constructor (private service:GraphsServiceService) { }
  ngOnInit() {
  
    this.service.httpResponseFilters("Hotels","TotalBookings")
    .subscribe( data=>{ 
      for(var successIndex=0;successIndex<Object.keys(data).length;successIndex++)
      {
        if(data[successIndex].type=="Purchased")
            this.successCount=data[successIndex].count;
      }
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
